import { prisma } from "../../../../generated/prisma-client";
import { getMinMaxFilterIndex } from "../../../utils";

export default {
  Query: {
    searchPostTypeOnFilter: async (_, args) => {
      const { artist = [], kind = [], keyword = [], location = [] } = args;
      let array = [];

      if (
        artist.length === 0 &&
        kind.length === 0 &&
        keyword.length === 0 &&
        location.length === 0
      ) {
        return [];
      }

      // 검색 된 filter 들을 통해서 해당하는 filter 를 가져 온다.
      const searchedFilters = await prisma.filters({
        where: {
          AND: array.concat(
            //artist
            artist.length !== 0
              ? artist.map(artist => {
                  return { artist_some: { id: artist } };
                })
              : {},
            //kind
            kind.length !== 0
              ? kind.map(kind => {
                  return { kind_some: { id: kind } };
                })
              : {},
            //keyword
            keyword.length !== 0
              ? keyword.map(keyword => {
                  return { keyword_some: { id: keyword } };
                })
              : {},

            //location
            location.length !== 0
              ? location.map(location => {
                  return { location_some: { id: location } };
                })
              : {},
            [{ postFilter_some: { id_not_in: [] } }]
          )
        }
      });

      let postTypeResult = [
        { postType: 0, filters: [], text: "판매" },
        { postType: 1, filters: [], text: "나눔" },
        { postType: 2, filters: [], text: "교환" },
        { postType: 3, filters: [], text: "장터" }
      ];

      for (const filter of searchedFilters) {
        for (const postType of filter.postType) {
          postTypeResult[postType].filters.push(filter.id);
        }
      }
      const result = postTypeResult.filter(element => {
        return element.filters.length !== 0;
      });

      return result;
    }
  }
};
