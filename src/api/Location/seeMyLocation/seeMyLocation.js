import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeMyLocation: async (_, __, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.locations({ where: { users_some: { id: user.id } } });
    }
  }
};
