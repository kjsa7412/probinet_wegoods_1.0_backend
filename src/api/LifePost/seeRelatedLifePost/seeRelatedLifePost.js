import { prisma } from "../../../../generated/prisma-client";
import { getRandomIntExclusive } from "../../../utils";

export default {
  Query: {
    seeRelatedLifePost: async (_, args) => {
      const { loadNumber, id = [] } = args;
      console.log("lifepost", id);
      const randomResult = [];

      const lifePosts = await prisma.lifePosts({
        where: { id_not_in: id }
      });

      const numbers = getRandomIntExclusive(lifePosts.length, loadNumber);

      for (const index of numbers) {
        randomResult.push(lifePosts[index]);
      }

      return randomResult;
    }
  }
};
