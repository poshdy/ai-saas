import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { checkAiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req: NextRequest) {
  const { userId } = auth();

  const body = await req.json();
  const { prompt, resolution = "512x512", amount = "1" } = body;

  try {
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }
    if (!prompt) {
      return new NextResponse("Prompt is Required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("size is Required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("amount is Required", { status: 400 });
    }
    const isFreeTrial = await checkAiLimit();

    const isPro = await checkSubscription();

    if (!isFreeTrial && !isPro) {
      return new NextResponse("Free trail has ended", {
        status: 403,
      });
    }
    const res = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });
    if (!isPro) {
      await increaseApiLimit();
    }
    return NextResponse.json(res.data);
  } catch (error: any) {
    return new NextResponse(`${error}`, { status: 500 });
  }
}
