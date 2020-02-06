import { prisma } from "../../../../generated/prisma-client";
import { getRandomIntExclusive } from "../../../utils";

export default {
  Query: {
    seeCreatorCardList: async (_, args) => {
      const { loadNumber, creatorId = [] } = args;

      const randomResult = [];

      const creators = await prisma.creators({
        where: { id_not_in: creatorId },
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
