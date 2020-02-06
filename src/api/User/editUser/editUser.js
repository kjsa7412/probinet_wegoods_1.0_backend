import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const {
        phoneNumber,
        email,
        password,
        username,
        avatar,
        bio,
        background
      } = args;
      const { user } = request;
      return prisma.updateUser({
        where: { id: user.id },
        data: {
          phoneNumber,
          email,
          password,
          username,
          avatar,
          bio,
          background
        }
      });
    }
  }
};
