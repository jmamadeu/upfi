import { AxiosError } from 'axios';
import { useMutation, UseMutationResult } from 'react-query';
import { api } from '../services/api';

type ImageDataType = {
  title: string;
  description: string;
  url: string;
};

const saveImage = async (image: ImageDataType): Promise<ImageDataType> => {
  await api.post('/images', image);

  return image;
};

export function UseSaveImage(): UseMutationResult<
  ImageDataType,
  AxiosError,
  ImageDataType
> {
  return useMutation<ImageDataType, AxiosError, ImageDataType>(img =>
    saveImage(img)
  );
}
