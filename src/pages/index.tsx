import { Box, Button } from '@chakra-ui/react';
import { useMemo } from 'react';
import { CardList } from '../components/CardList';
import { Error } from '../components/Error';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { useGetImages } from '../hooks/use-get-images';

export default function Home(): JSX.Element {
  const {
    data,
    isError,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetImages();

  const formattedData = useMemo(() => {
    return data?.pages.flatMap(imagePage => imagePage.data);
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button
            my={6}
            isLoading={isFetchingNextPage}
            type="button"
            py={6}
            onClick={() => fetchNextPage()}
          >
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
