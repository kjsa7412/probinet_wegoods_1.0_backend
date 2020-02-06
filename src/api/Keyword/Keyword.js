import { prisma } from "../../../generated/prisma-client";

export default {
  Keyword: {
    filters: ({ id }) => prisma.keyword({ id }).filters()
  }
};
