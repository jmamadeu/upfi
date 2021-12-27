import { AxiosError } from 'axios';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import { api } from '../services/api';

type FetchImagesType = {
  pageParam?: string;
};

type ImageType = {
  title: string;
  description: string;
  url: string;
  id: string;
  ts: number;
};

type FetchImagesResponse = {
  data: Array<ImageType>;
  after?: string;
};

const fetchImages = async ({
  pageParam,
}: FetchImagesType): Promise<FetchImagesResponse> => {
  const { data } = await api.get<FetchImagesResponse>(
    `/images/?after=${pageParam ?? ''}`
  );

  return data;
};

export function useGetImages(): UseInfiniteQueryResult<
  FetchImagesResponse,
  AxiosError
> {
  return useInfiniteQuery<FetchImagesResponse, AxiosError>(
    'images',
    fetchImages,
    {
      getNextPageParam: lastPage => lastPage.after,
    }
  );
}
