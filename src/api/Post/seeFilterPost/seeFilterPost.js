import { prisma } from "../../../../generated/prisma-client";
import { getRandomIntExclusive } from "../../../utils";

export default {
  Query: {
    seeFilterPost: async (_, args) => {
      const { filterId, loadNumber, postsId = [] } = args;

      const randomResult = [];

      const posts = await prisma.posts({
        where: {
          AND: [{ postFilter: { id: filterId } }, { id_not_in: postsId }]
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
