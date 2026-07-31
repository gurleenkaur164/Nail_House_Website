"use client";

import { useState, useRef, useCallback, useEffect } from "react";

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

type Step = "upload" | "paint" | "preview";

export default function NailTryOn() {
  const [step, setStep] = useState<Step>("upload");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(POLISH_COLORS[0]);
  const [intensity, setIntensity] = useState(0.6);
  const [brushSize, setBrushSize] = useState(12);
  const [isEraser, setIsEraser] = useState(false);

  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const originalImageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isPainting = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const dims = useRef({ w: 0, h: 0 });

  const getCanvasDims = (img: HTMLImageElement) => {
    const maxW = 600;
    const scale = img.naturalWidth > maxW ? maxW / img.naturalWidth : 1;
    return { w: img.naturalWidth * scale, h: img.naturalHeight * scale };
  };

  const initCanvases = useCallback((img: HTMLImageElement) => {
    const { w, h } = getCanvasDims(img);
    dims.current = { w, h };

    const display = displayCanvasRef.current;
    if (display) {
      display.width = w;
      display.height = h;
      const ctx = display.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
    }

    const mask = maskCanvasRef.current;
    if (mask) {
      mask.width = w;
      mask.height = h;
      const ctx = mask.getContext("2d")!;
      ctx.clearRect(0, 0, w, h);
    }
  }, []);

  const renderPreview = useCallback(
    (color: string, alpha: number) => {
      const display = displayCanvasRef.current;
      const mask = maskCanvasRef.current;
      const img = originalImageRef.current;
      if (!display || !mask || !img) return;

      const ctx = display.getContext("2d")!;
      const { w, h } = dims.current;

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);

      const colorLayer = document.createElement("canvas");
      colorLayer.width = w;
      colorLayer.height = h;
      const clCtx = colorLayer.getContext("2d")!;

      clCtx.drawImage(img, 0, 0, w, h);
      clCtx.globalCompositeOperation = "multiply";
      clCtx.fillStyle = color;
      clCtx.globalAlpha = alpha;
      clCtx.fillRect(0, 0, w, h);

      clCtx.globalCompositeOperation = "destination-in";
      clCtx.globalAlpha = 1;
      clCtx.drawImage(mask, 0, 0);

      ctx.drawImage(colorLayer, 0, 0);
    },
    []
  );

  const renderPaintOverlay = useCallback(() => {
    const display = displayCanvasRef.current;
    const mask = maskCanvasRef.current;
    const img = originalImageRef.current;
    if (!display || !mask || !img) return;

    const ctx = display.getContext("2d")!;
    const { w, h } = dims.current;

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);

    ctx.globalAlpha = 0.35;
    ctx.fillStyle = "#e74c8b";
    const maskCtx = mask.getContext("2d")!;
    const maskData = maskCtx.getImageData(0, 0, w, h);

    const highlight = document.createElement("canvas");
    highlight.width = w;
    highlight.height = h;
    const hlCtx = highlight.getContext("2d")!;
    hlCtx.fillStyle = "#e74c8b";
    hlCtx.fillRect(0, 0, w, h);
    hlCtx.globalCompositeOperation = "destination-in";
    hlCtx.putImageData(maskData, 0, 0);

    ctx.drawImage(highlight, 0, 0);
    ctx.globalAlpha = 1;
  }, []);

  const getPointerPos = (
    e: React.MouseEvent | React.TouchEvent,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX: number, clientY: number;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const paintAt = (x: number, y: number) => {
    const mask = maskCanvasRef.current;
    if (!mask) return;
    const ctx = mask.getContext("2d")!;
    ctx.globalCompositeOperation = isEraser ? "destination-out" : "source-over";
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
  };

  const paintLine = (x1: number, y1: number, x2: number, y2: number) => {
    const mask = maskCanvasRef.current;
    if (!mask) return;
    const ctx = mask.getContext("2d")!;
    ctx.globalCompositeOperation = isEraser ? "destination-out" : "source-over";
    ctx.lineWidth = brushSize * 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  const onPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isPainting.current = true;
    const pos = getPointerPos(e, displayCanvasRef.current!);
    lastPos.current = pos;
    paintAt(pos.x, pos.y);
    renderPaintOverlay();
  };

  const onPointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isPainting.current) return;
    e.preventDefault();
    const pos = getPointerPos(e, displayCanvasRef.current!);
    if (lastPos.current) {
      paintLine(lastPos.current.x, lastPos.current.y, pos.x, pos.y);
    }
    lastPos.current = pos;
    renderPaintOverlay();
  };

  const onPointerUp = () => {
    isPainting.current = false;
    lastPos.current = null;
  };

  useEffect(() => {
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchend", onPointerUp);
    return () => {
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      setImageSrc(src);
      const img = new Image();
      img.onload = () => {
        originalImageRef.current = img;
        setStep("paint");
        requestAnimationFrame(() => initCanvases(img));
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleApplyColor = () => {
    setStep("preview");
    requestAnimationFrame(() =>
      renderPreview(selectedColor.hex, intensity)
    );
  };

  const handleColorChange = (color: (typeof POLISH_COLORS)[number]) => {
    setSelectedColor(color);
    if (step === "preview") {
      requestAnimationFrame(() => renderPreview(color.hex, intensity));
    }
  };

  const handleIntensityChange = (val: number) => {
    setIntensity(val);
    if (step === "preview") {
      requestAnimationFrame(() => renderPreview(selectedColor.hex, val));
    }
  };

  const handleBackToPaint = () => {
    setStep("paint");
    requestAnimationFrame(() => renderPaintOverlay());
  };

  const handleReset = () => {
    setStep("upload");
    setImageSrc(null);
    originalImageRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const clearMask = () => {
    const mask = maskCanvasRef.current;
    if (!mask) return;
    const ctx = mask.getContext("2d")!;
    ctx.clearRect(0, 0, mask.width, mask.height);
    renderPaintOverlay();
  };

  return (
    <section className="tryon-section" id="try-on">
      <div className="tryon-header">
        <p className="section-eyebrow">Try Before You Book</p>
        <h2 className="tryon-title">Nail Color Try-On</h2>
        <p className="tryon-subtitle">
          Upload a photo of your hand, paint over your nails, and preview
          different polish shades instantly.
        </p>
      </div>

      <div className="tryon-container">
        {step === "upload" && (
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
        )}

        {(step === "paint" || step === "preview") && (
          <div className="tryon-preview">
            <div className="tryon-canvas-wrap">
              <canvas
                ref={displayCanvasRef}
                className="tryon-canvas"
                onMouseDown={step === "paint" ? onPointerDown : undefined}
                onMouseMove={step === "paint" ? onPointerMove : undefined}
                onTouchStart={step === "paint" ? onPointerDown : undefined}
                onTouchMove={step === "paint" ? onPointerMove : undefined}
                style={{ cursor: step === "paint" ? "crosshair" : "default" }}
              />
              <canvas ref={maskCanvasRef} style={{ display: "none" }} />
              {step === "paint" && (
                <span className="tryon-demo-badge">Paint Your Nails</span>
              )}
              {step === "preview" && (
                <span className="tryon-demo-badge">Demo Preview</span>
              )}
            </div>

            <div className="tryon-controls">
              {step === "paint" && (
                <>
                  <div className="tryon-step-info">
                    <p className="tryon-controls-label">Step 1</p>
                    <p className="tryon-step-desc">
                      Paint over your nails with the brush. Use the eraser to fix mistakes.
                    </p>
                  </div>

                  <div className="tryon-brush-controls">
                    <div className="tryon-brush-toggle">
                      <button
                        className={`tryon-toggle-btn${!isEraser ? " tryon-toggle-btn--active" : ""}`}
                        onClick={() => setIsEraser(false)}
                      >
                        Brush
                      </button>
                      <button
                        className={`tryon-toggle-btn${isEraser ? " tryon-toggle-btn--active" : ""}`}
                        onClick={() => setIsEraser(true)}
                      >
                        Eraser
                      </button>
                    </div>

                    <label className="tryon-controls-label" htmlFor="brush-size">
                      Brush Size
                    </label>
                    <input
                      id="brush-size"
                      type="range"
                      min={4}
                      max={30}
                      step={1}
                      value={brushSize}
                      onChange={(e) => setBrushSize(parseInt(e.target.value))}
                      className="tryon-slider"
                    />
                  </div>

                  <div className="tryon-actions">
                    <button className="btn-primary" onClick={handleApplyColor}>
                      Apply Color
                    </button>
                    <button className="btn-outline" onClick={clearMask} style={{ padding: "10px 20px", fontSize: "0.68rem" }}>
                      Clear
                    </button>
                    <button className="btn-outline" onClick={handleReset} style={{ padding: "10px 20px", fontSize: "0.68rem" }}>
                      Reset
                    </button>
                  </div>
                </>
              )}

              {step === "preview" && (
                <>
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
                      min={0.2}
                      max={0.9}
                      step={0.05}
                      value={intensity}
                      onChange={(e) =>
                        handleIntensityChange(parseFloat(e.target.value))
                      }
                      className="tryon-slider"
                    />
                  </div>

                  <div className="tryon-actions">
                    <button className="btn-outline" onClick={handleBackToPaint} style={{ padding: "10px 20px", fontSize: "0.68rem" }}>
                      Edit Nails
                    </button>
                    <label className="btn-outline tryon-reupload" style={{ padding: "10px 20px", fontSize: "0.68rem" }}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        hidden
                      />
                      New Photo
                    </label>
                    <button className="btn-outline" onClick={handleReset} style={{ padding: "10px 20px", fontSize: "0.68rem" }}>
                      Reset
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
