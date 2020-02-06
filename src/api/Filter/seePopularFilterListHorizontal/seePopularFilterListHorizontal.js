import { prisma } from "../../../../generated/prisma-client";
import { getRandomIntExclusive } from "../../../utils";

export default {
  Query: {
    seePopularFilterListHorizontal: async (_, args) => {
      const { loadNumber } = args;

      const randomResult = [];

      const filters = await prisma.filters({
        where: { popularFilter: true }
      });

      const numbers = getRandomIntExclusive(filters.length, loadNumber);

      for (const index of numbers) {
        randomResult.push(filters[index]);
      }

      return randomResult;
    }
  }
};
