import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: "Prompt жоқ" }, { status: 400 });
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });
    const content = message.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");
    const html = content.text.trim()
      .replace(/^```html\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
    return NextResponse.json({ html });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Белгісіз қате";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
