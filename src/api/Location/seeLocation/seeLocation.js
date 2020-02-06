import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeLocation: async (_, __) => {
      return prisma.locations();
    }
  }
};
