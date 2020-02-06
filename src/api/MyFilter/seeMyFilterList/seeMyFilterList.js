import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeMyFilterList: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma
        .user({ id: user.id })
        .myFilter({ orderBy: "updatedAt_DESC" });
    }
  }
};
