import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { IColor } from '../models/color';

const fetchColors = (page: number) =>
  axios.get<IColor[]>(`http://localhost:4000/colors?_limit=2&_page=${page}`);

export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { isLoading, isFetching, isError, error, data } = useQuery(
    ['colors', pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{(error as Error).message}</h2>;
  }

  return (
    <>
      <div>
        {data?.data.map((color) => (
          <div key={color.id}>
            <h2>
              {color.id}. {color.label}
            </h2>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev page
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next page
        </button>
      </div>
      {isFetching && <div>Loading...</div>}
    </>
  );
};
