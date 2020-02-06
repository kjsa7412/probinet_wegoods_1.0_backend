import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeMyPostList: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.user({ id: user.id }).posts({ orderBy: "createdAt_DESC" });
    }
  }
};
