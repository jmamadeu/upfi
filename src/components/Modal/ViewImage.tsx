import {
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="pGray.800">
        <ModalBody display="flex" justify="center">
          <Image
            src={imgUrl}
            alt="image"
            objectFit="cover"
            w="max"
            h={48}
            borderTopRadius="md"
            cursor="pointer"
          />
        </ModalBody>
        <ModalFooter>
          <Link color="gray" target="_blank" href={imgUrl}>
            Open original image
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
