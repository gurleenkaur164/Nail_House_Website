"use client";

import { useState, useRef, useCallback } from "react";

const POLISH_COLORS = [
  { name: "Classic Red", hex: "#c0392b" },
  { name: "Rose Pink", hex: "#e91e8c" },
  { name: "Nude Blush", hex: "#d4a58c" },
  { name: "Berry", hex: "#8e244d" },
  { name: "Coral", hex: "#e8735a" },
  { name: "Mauve", hex: "#b5738a" },
  { name: "Plum", hex: "#6c3461" },
  { name: "Peach", hex: "#f5b895" },
  { name: "Hot Pink", hex: "#ff1493" },
  { name: "Burgundy", hex: "#6b1c34" },
  { name: "Lavender", hex: "#b49fcc" },
  { name: "Mint", hex: "#98d4bb" },
  { name: "French White", hex: "#fdf5e6" },
  { name: "Jet Black", hex: "#1a1a1a" },
  { name: "Chrome Silver", hex: "#c0c0c0" },
  { name: "Gold Glam", hex: "#d4a843" },
];

export default function NailTryOn() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(POLISH_COLORS[0]);
  const [intensity, setIntensity] = useState(0.55);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalImageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const applyColor = useCallback(
    (img: HTMLImageElement, color: string, alpha: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const maxW = 600;
      const scale = img.naturalWidth > maxW ? maxW / img.naturalWidth : 1;
      canvas.width = img.naturalWidth * scale;
      canvas.height = img.naturalHeight * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "destination-in";
      ctx.globalAlpha = 1;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "source-over";

      ctx.globalAlpha = 0.15;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";
    },
    []
  );

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      setImage(src);
      const img = new Image();
      img.onload = () => {
        originalImageRef.current = img;
        applyColor(img, selectedColor.hex, intensity);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleColorChange = (color: (typeof POLISH_COLORS)[number]) => {
    setSelectedColor(color);
    if (originalImageRef.current) {
      applyColor(originalImageRef.current, color.hex, intensity);
    }
  };

  const handleIntensityChange = (val: number) => {
    setIntensity(val);
    if (originalImageRef.current) {
      applyColor(originalImageRef.current, selectedColor.hex, val);
    }
  };

  const handleReset = () => {
    setImage(null);
    originalImageRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <section className="tryon-section" id="try-on">
      <div className="tryon-header">
        <p className="section-eyebrow">Try Before You Book</p>
        <h2 className="tryon-title">Nail Color Try-On</h2>
        <p className="tryon-subtitle">
          Upload a photo of your hand and preview how different polish shades
          will look on you.
        </p>
      </div>

      <div className="tryon-container">
        {!image ? (
          <label className="tryon-upload">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              hidden
            />
            <div className="tryon-upload-inner">
              <span className="tryon-upload-text">Upload Hand Photo</span>
              <span className="tryon-upload-hint">
                JPG, PNG &mdash; any angle works
              </span>
            </div>
          </label>
        ) : (
          <div className="tryon-preview">
            <div className="tryon-canvas-wrap">
              <canvas ref={canvasRef} className="tryon-canvas" />
              <span className="tryon-demo-badge">Demo Preview</span>
            </div>

            <div className="tryon-controls">
              <div className="tryon-palette">
                <p className="tryon-controls-label">Choose a shade</p>
                <div className="tryon-swatches">
                  {POLISH_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      className={`tryon-swatch${
                        selectedColor.hex === c.hex ? " tryon-swatch--active" : ""
                      }`}
                      style={{ background: c.hex }}
                      onClick={() => handleColorChange(c)}
                      title={c.name}
                      aria-label={c.name}
                    />
                  ))}
                </div>
                <p className="tryon-color-name">{selectedColor.name}</p>
              </div>

              <div className="tryon-intensity">
                <label className="tryon-controls-label" htmlFor="intensity">
                  Intensity
                </label>
                <input
                  id="intensity"
                  type="range"
                  min={0.15}
                  max={0.85}
                  step={0.05}
                  value={intensity}
                  onChange={(e) =>
                    handleIntensityChange(parseFloat(e.target.value))
                  }
                  className="tryon-slider"
                />
              </div>

              <div className="tryon-actions">
                <label className="btn-outline tryon-reupload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    hidden
                  />
                  New Photo
                </label>
                <button className="btn-outline" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
