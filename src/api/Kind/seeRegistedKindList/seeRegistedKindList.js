import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRegistedKindList: async (_, __) =>
      prisma.kinds({ where: { registed: true } })
  }
};
