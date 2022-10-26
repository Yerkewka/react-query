import axios from 'axios';
import { useQueries } from 'react-query';
import { ISuperHero } from '../models/super-hero';

const fetchSuperHero = (heroId: number) => {
  return axios.get<ISuperHero>(`http://localhost:4000/superheroes/${heroId}`);
};

interface IProps {
  heroIds: number[];
}

export const DynamicParallelPage: React.FC<IProps> = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((heroId) => ({
      queryKey: ['super-hero', heroId],
      queryFn: () => fetchSuperHero(heroId),
    }))
  );

  console.log(queryResults);

  return <div>DynamicParallelPage</div>;
};
