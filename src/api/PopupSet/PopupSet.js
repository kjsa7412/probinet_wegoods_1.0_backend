import { prisma } from "../../../generated/prisma-client";

export default {
  PopupSet: {
    user: ({ id }) => prisma.popupSet({ id }).user()
  }
};
