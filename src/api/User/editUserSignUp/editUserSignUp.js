import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUserSignUp: (_, args) => {
      const { id, username, password } = args;
      return prisma.updateUser({
        where: { id },
        data: {
          username,
          password
        }
      });
    }
  }
};
