import { prisma } from "../../../../generated/prisma-client";
import { getRandomIntExclusive } from "../../../utils";

export default {
  Query: {
    seeRandomGathering: async (_, args) => {
      const { loadNumber, id = [] } = args;
      console.log("gathering", id);
      const randomResult = [];

      const rooms = await prisma.rooms({
        where: {
          AND: [{ title_not: "" }, { id_not_in: id }]
        }
      });

      const numbers = getRandomIntExclusive(rooms.length, loadNumber);

      for (const index of numbers) {
        randomResult.push(rooms[index]);
      }

      return randomResult;
    }
  }
};
