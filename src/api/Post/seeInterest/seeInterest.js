import { prisma } from "../../../../generated/prisma-client";
import { getRandomIntExclusive } from "../../../utils";

const LOADNUMBER = 30;

export default {
  Query: {
    seeInterest: async (_, args) => {
      const { loadNumber, postsId = [] } = args;
      const randomResult = [];
      let realLoadNumber = 0;

      // creator 가 올린 전체 post 를 가져온다.
      const posts = await prisma.posts({
        where: {
          AND: [{ user: { creator: { id_not: "" } } }, { id_not_in: postsId }]
        }
      });

      if (loadNumber !== undefined) {
        realLoadNumber = loadNumber;
      } else {
        realLoadNumber = LOADNUMBER;
      }

      const numbers = getRandomIntExclusive(posts.length, realLoadNumber);

      for (const index of numbers) {
        randomResult.push(posts[index]);
      }

      return randomResult;
    }
  }
};
