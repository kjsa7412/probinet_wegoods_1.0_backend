import { prisma } from "../../../generated/prisma-client";

export default {
  Creator: {
    user: ({ id }) => prisma.creator({ id }).user()
  }
};
