import { prisma } from "../../../generated/prisma-client";

export default {
  Message: {
    from: ({ id }) => prisma.message({ id }).from(),
    room: ({ id }) => prisma.message({ id }).room()
  }
};
