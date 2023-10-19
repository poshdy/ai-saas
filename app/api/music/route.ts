import Replicate from "replicate";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { checkAiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});
export async function POST(req: NextRequest, res: NextResponse) {
  const { userId } = auth();
  console.log(userId);
  const body = await req.json();
  const { prompt } = body;

  try {
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Bad request", { status: 400 });
    }
    const isFreeTrial = await checkAiLimit();

    const isPro = await checkSubscription();

    if (!isFreeTrial && !isPro) {
      return new NextResponse("Free trail has ended", {
        status: 403,
      });
    }

    const res = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt,
        },
      }
    );
    if (!isPro) {
      await increaseApiLimit();
    }
    return NextResponse.json(res);
  } catch (error: any) {
    return new NextResponse(`${error}`, { status: 500 });
  }
}
