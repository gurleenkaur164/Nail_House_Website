import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const ipTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipTimestamps.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) return true;

  recent.push(now);
  ipTimestamps.set(ip, recent);
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { name, phone, service, message } = body;

    if (!name || !phone || !service) {
      return NextResponse.json(
        { error: "Name, phone, and service are required." },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || name.length > 200) {
      return NextResponse.json({ error: "Invalid name." }, { status: 400 });
    }
    if (typeof phone !== "string" || !/^\+?[\d\s-]{7,20}$/.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
    }
    if (typeof service !== "string" || service.length > 200) {
      return NextResponse.json({ error: "Invalid service." }, { status: 400 });
    }

    const sql = getDb();
    await sql`
      INSERT INTO appointments (customer_name, phone, service, message, status)
      VALUES (${name.trim()}, ${phone.trim()}, ${service.trim()}, ${(message || "").trim()}, 'pending')
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Appointment insert failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
