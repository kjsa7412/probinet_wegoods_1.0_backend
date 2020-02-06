import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Query: {
    confirmPassword: async (_, args) => {
      const { email, username, password } = args;
      var user;

      if (email !== undefined) {
        user = await prisma.user({ email });
      } else if (username !== undefined) {
        user = await prisma.user({ username });
      }

      if (user) {
        if (user.password === password) {
          return generateToken(user.id);
        } else {
          throw Error("Wrong password");
        }
      } else {
        throw Error("Wrong email or username");
      }
    }
  }
};
