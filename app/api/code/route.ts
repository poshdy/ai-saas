import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { checkAiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const config: ChatCompletionMessageParam = {
  role: "system",
  content:
    "Your are a code generator. You must answer only in markdown code snippets.",
};
export async function POST(req: NextRequest) {
  const { userId } = auth();

  const body = await req.json();
  const { messages } = body;

  try {
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }
    if (!messages) {
      return new NextResponse("Messages are Required", { status: 400 });
    }
    const isFreeTrial = await checkAiLimit();
    const isPro = await checkSubscription();

    if (!isFreeTrial && !isPro) {
      return new NextResponse("Free trail has ended", {
        status: 403,
      });
    }
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [config, ...messages],
    });

    if (!isPro) {
      await increaseApiLimit();
    }
    return NextResponse.json(res.choices.at(0)?.message);
  } catch (error: any) {
    return new NextResponse(`${error}`, { status: 500 });
  }
}
