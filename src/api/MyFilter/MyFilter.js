import { prisma } from "../../../generated/prisma-client";

export default {
  MyFilter: {
    user: ({ id }) => prisma.myFilter({ id }).user(),
    filter: ({ id }) => prisma.myFilter({ id }).filter()
  }
};
