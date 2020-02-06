import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seePopupSet: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;

      return prisma.user({ id: user.id }).popupSet();
    }
  }
};
