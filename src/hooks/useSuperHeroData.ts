import axios, { AxiosResponse } from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { ISuperHero } from '../models/super-hero';

const fetchSuperHero = ({ queryKey }: { queryKey: (string | number)[] }) => {
  const heroId = queryKey[1];
  return axios.get<ISuperHero>(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId: number) => {
  const queryClient = useQueryClient();

  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData<AxiosResponse<ISuperHero[]>>('super-heroes')
        ?.data?.find((hero) => hero.id === heroId);

      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
  });
};
