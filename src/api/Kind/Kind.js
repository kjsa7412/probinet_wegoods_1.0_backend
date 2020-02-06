import { prisma } from "../../../generated/prisma-client";

export default {
  Kind: {
    filters: ({ id }) => prisma.kind({ id }).filters()
  }
};
