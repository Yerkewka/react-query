import { useQuery } from 'react-query';
import axios from 'axios';

export const RQSuperHeroesPage = () => {
  const { isLoading, data } = useQuery('super-heroes', () =>
    axios.get('http://localhost:4000/superheroes')
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {data?.data.map((hero: any) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
};
