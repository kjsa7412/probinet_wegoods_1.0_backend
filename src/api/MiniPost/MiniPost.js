import { prisma } from "../../../generated/prisma-client";

export default {
  MiniPost: {
    user: ({ id }) => prisma.miniPost({ id }).user()
  }
};
