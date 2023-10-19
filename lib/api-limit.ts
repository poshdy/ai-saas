import { MAX_FREE_TRAILS } from "@/constants";
import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

/// increase api limit by one when the user use it in the free tier

export const increaseApiLimit = async () => {
  const { userId } = auth();
  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId: userId },
      data: {
        count: userApiLimit.count + 1,
      },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: {
        userId,
        count: 1,
      },
    });
  }
};

// check if user exceed api limit

export const checkAiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_TRAILS) {
    return true;
  } else {
    return false;
  }
};

export const getApiCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userId) {
    return 0;
  }

  return userApiLimit?.count;
};
