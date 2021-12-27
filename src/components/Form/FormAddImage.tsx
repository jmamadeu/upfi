import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UseSaveImage } from '../../hooks/use-save-image';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

type FormDataProps = {
  image: string;
  title: string;
  description: string;
};

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const { mutateAsync } = UseSaveImage();

  const formValidations = {
    image: {
      required: 'required field',
    },
    title: {
      required: 'required field',
    },
    description: {
      required: 'required field',
    },
  };

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm<FormDataProps>();

  const { errors } = formState;

  const onSubmit = handleSubmit(async data => {
    try {
      if (!imageUrl) {
        toast({
          title: 'Image is required',
          description: 'You should select a image',
          status: 'error',
        });
        return;
      }

      await mutateAsync({
        title: data.title,
        description: data.description,
        url: imageUrl,
      });

      toast({
        title: 'Image uploaded',
        description: 'Your image was uploaded with success',
        status: 'success',
      });
    } catch (err) {
      toast({
        title: 'Unexpected error',
        description: err.message,
        status: 'error',
        position: 'top-right',
      });
    } finally {
      reset();
      setLocalImageUrl('');
      closeModal();
    }
  });

  const onChangeInputFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<boolean | void> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return true;
  };

  return (
    <Box as="form" width="100%" onSubmit={onSubmit}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={() => setError('image', null)}
          trigger={trigger}
          register={register('image', formValidations.image)}
          error={errors.image}
          onChange={onChangeInputFile}
          // TODO REGISTER IMAGE INPUT WITH VALIDATIONS
        />

        <TextInput
          placeholder="Título da imagem..."
          name="title"
          register={register('title', formValidations.title)}
          error={errors.title}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          name="description"
          register={register('description', formValidations.description)}
          error={errors.description}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
