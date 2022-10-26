import { Link } from 'react-router-dom';

import { useSuperHeroesData } from '../hooks/useSuperHeroesData';
import { ISuperHero } from '../models/super-hero';

export const RQSuperHeroesPage = () => {
  // const [refetchInterval, setRefetchInterval] = useState<number | false>(3000);

  const onSuccess = (data: ISuperHero[]) => {
    console.log('Perform side effect after data fetching', data);

    // if (data.data.length > 3) {
    //   setRefetchInterval(false);
    // }
  };

  const onError = (error: Error) => {
    console.log('Perform side effect after encountering error', error);
  };

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(
    onSuccess,
    onError
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <button onClick={() => refetch()}>Fetch heroes</button>
      {data?.map((hero) => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
      {/* {data?.map((heroName: string) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};
