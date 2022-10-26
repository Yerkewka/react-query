import axios from 'axios';
import { useQuery } from 'react-query';

import { ISuperHero } from '../models/super-hero';

const fetchSuperHeroes = () =>
  axios.get<ISuperHero[]>('http://localhost:4000/superheroes');

export const useSuperHeroesData = (
  onSuccess: (data: ISuperHero[]) => void,
  onError: (error: Error) => void
) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
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
