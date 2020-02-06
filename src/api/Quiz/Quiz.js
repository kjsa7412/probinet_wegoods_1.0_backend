import { prisma } from "../../../generated/prisma-client";

export default {
  Quiz: {
    user: ({ id }) => prisma.quiz({ id }).user(),
    posts: ({ id }) => prisma.quiz({ id }).posts()
  }
};
