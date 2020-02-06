import { prisma } from "../../../../generated/prisma-client";
import { getRandomIntExclusive } from "../../../utils";

export default {
  Query: {
    seeOneGroup: async (_, args) => {
      const { groupId } = args;

      return prisma.room({ id: groupId });
    }
  }
};
