import axios from 'axios';
import { Fragment, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import { IColor } from '../models/color';

const fetchColors = ({ pageParam = 1 }) =>
  axios.get<IColor[]>(
    `http://localhost:4000/colors?_limit=2&_page=${pageParam}`
  );

export const InfiniteQueriesPage = () => {
  const {
    isLoading,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(['colors'], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      }

      return undefined;
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{(error as Error).message}</h2>;
  }

  return (
    <>
      <div>
        {data?.pages.map((group, index) => (
          <Fragment key={index}>
            {group.data.map((color) => (
              <h2 key={color.id}>
                {color.id}. {color.label}
              </h2>
            ))}
          </Fragment>
        ))}
      </div>
      <div>
        <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
          Load more
        </button>
      </div>
      {isFetching && !isFetchingNextPage && <div>Fetching...</div>}
    </>
  );
};
