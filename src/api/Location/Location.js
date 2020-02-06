import { prisma } from "../../../generated/prisma-client";

export default {
  Location: {
    filters: ({ id }) => prisma.location({ id }).filters()
  }
};
