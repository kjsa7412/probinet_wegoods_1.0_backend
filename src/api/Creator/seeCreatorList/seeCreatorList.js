import { prisma } from "../../../../generated/prisma-client";
import { getRandomIntExclusive } from "../../../utils";

export default {
  Query: {
    seeCreatorList: async (_, args) => {
      const { loadNumber } = args;

      const randomResult = [];

      const creators = await prisma.creators({
        orderBy: "rank_ASC"
      });

      const numbers = getRandomIntExclusive(creators.length, loadNumber);

      for (const index of numbers) {
        randomResult.push(creators[index]);
      }

      return randomResult;
    }
  }
};
