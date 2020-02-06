import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeOneFilter: async (_, args) => {
      const { id } = args;
      return await prisma.filter({ id });
    }
  }
};
