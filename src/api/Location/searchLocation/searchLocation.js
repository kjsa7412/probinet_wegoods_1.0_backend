import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchLocation: async (_, args) => {
      const { term = "" } = args;

      return prisma.locations({ where: { text_contains: term } });
    }
  }
};
