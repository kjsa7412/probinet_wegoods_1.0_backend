import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeMyFilter: async (_, args) => {
      const { id } = args;
      return prisma.myFilter({ id });
    }
  }
};
