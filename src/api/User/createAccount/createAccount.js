import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, password } = args;
      const user = await prisma.createUser({
        username,
        email,
        password,
        popupSet: {
          create: {}
        }
      });

      return user;
    }
  }
};
