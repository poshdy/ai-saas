import { MAX_FREE_TRAILS } from "@/constants";
import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

export const increaseApiLimit = async () => {
  const { userId } = auth();
  if (!userId) {
    return;
  }
  try {
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
  } catch (error) {
    console.log(error);
  }
};



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
  try {
    const userApiLimit = await prismadb.userApiLimit.findUnique({
      where: {
        userId,
      },
    });

    if (!userId) {
      return 0;
    }
    return userApiLimit?.count;
  } catch (error) {
    console.log(error);
  }
};
