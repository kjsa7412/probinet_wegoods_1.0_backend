import { prisma } from "../../../../generated/prisma-client";
import { getRandomIntExclusive } from "../../../utils";

export default {
  Query: {
    seeAdvertisement: async (_, args) => {
      const { loadNumber } = args;

      const randomResult = [];

      const advertisements = await prisma.advertisements();

      const numbers = getRandomIntExclusive(advertisements.length, loadNumber);

      for (const index of numbers) {
        randomResult.push(advertisements[index]);
      }

      return randomResult;
    }
  }
};
