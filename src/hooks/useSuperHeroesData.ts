import { request } from '../utils/axios-utils';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { ISuperHero } from '../models/super-hero';

const fetchSuperHeroes = () =>
  // axios.get<ISuperHero[]>('http://localhost:4000/superheroes');
  request<ISuperHero[]>({ url: '/superheroes' });

const addSuperHero = (hero: Omit<ISuperHero, 'id'>) =>
  // axios.post<ISuperHero>('http://localhost:4000/superheroes', hero);
  request<ISuperHero>({ url: '/superheroes', method: 'POST', data: hero });

const CACHE_KEY = 'super-heroes';

export const useSuperHeroesData = (
  onSuccess: (data: ISuperHero[]) => void,
  onError: (error: Error) => void
) => {
  return useQuery(CACHE_KEY, fetchSuperHeroes, {
    // cacheTime: 5 * 60 * 1000,
    // staleTime: 30 * 1000, // 30 sec
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
    // refetchInterval: refetchInterval,
    // refetchIntervalInBackground: true,
    // enabled: false,
    onSuccess,
    onError,
    select: (data) => data.data,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);

    //   return superHeroNames;
    // },
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries(CACHE_KEY);
    //   queryClient.setQueryData(CACHE_KEY, (oldQueryData: any) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },
    onMutate: async (newHero: Omit<ISuperHero, 'id'>) => {
      await queryClient.cancelQueries(CACHE_KEY);

      const previousHeroData = queryClient.getQueryData(CACHE_KEY);

      queryClient.setQueryData(CACHE_KEY, (oldQueryData: any) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, newHero],
        };
      });

      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(CACHE_KEY, context?.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(CACHE_KEY);
    },
  });
};
