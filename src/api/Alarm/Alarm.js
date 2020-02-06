import { prisma } from "../../../generated/prisma-client";

export default {
  Alarm: {
    targetUser: ({ id }) => prisma.alarm({ id }).targetUser()
  }
};
