import { prisma } from "../../../../generated/prisma-client";
import { getRandomIntExclusive } from "../../../utils";

export default {
  Query: {
    seeMarketList: async (_, args) => {
      const { loadNumber, postsId = [] } = args;

      const randomResult = [];

      const posts = await prisma.posts({
        where: {
          AND: [{ type: 3 }, { id_not_in: postsId }]
        }
      });

      const numbers = getRandomIntExclusive(posts.length, loadNumber);

      for (const index of numbers) {
        randomResult.push(posts[index]);
      }

      return randomResult;
    }
  }
};
