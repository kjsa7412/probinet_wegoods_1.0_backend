import { prisma } from "../../../../generated/prisma-client";
import { getMinMaxFilterIndex } from "../../../utils";

export default {
  Query: {
    searchLocationOnFilter: async (_, args) => {
      const { artist = [], kind = [], keyword = [], postType = [] } = args;
      let array = [];

      if (
        artist.length === 0 &&
        kind.length === 0 &&
        keyword.length === 0 &&
        postType.length === 0
      ) {
        return [];
      }

      // 검색 된 filter 들을 통해서 해당하는 filter 를 가져 온다.
      let searchedFilters = await prisma.filters({
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

            [{ postFilter_some: { id_not_in: [] } }]
          )
        }
      });

      // postType 이 있는 경우에는 한번더 걸러야 한다.
      if (
        postType.length !== 0 &&
        searchedFilters !== undefined &&
        searchedFilters !== 0
      ) {
        searchedFilters = searchedFilters.filter(filter => {
          for (const item of postType) {
            if (filter.postType.includes(item)) {
              return true;
            }
          }
          return false;
        });
      }

      // 해당 되는 필터로 부터 해당하는 kind 를 가져온다.
      let searchedLocation = await prisma.locations({
        where: {
          AND: [
            {
              filters_some: {
                id_in:
                  searchedFilters !== undefined && searchedFilters !== 0
                    ? searchedFilters.map(filter => {
                        return filter.id;
                      })
                    : []
              }
            }
          ]
        }
      });

      return searchedLocation;
    }
  }
};
