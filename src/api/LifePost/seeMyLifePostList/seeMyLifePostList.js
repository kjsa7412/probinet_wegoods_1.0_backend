import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeMyLifePostList: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma
        .user({ id: user.id })
        .lifePosts({ orderBy: "createdAt_DESC" });
    }
  }
};
