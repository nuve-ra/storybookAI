import { Modal, ModalContent, ModalBody, useDisclosure } from '@heroui/react';
import Image from 'next/image';
import { useEffect } from 'react';

export default function App({ isLoading }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <>
      <div>
        {isLoading && (
          <Modal
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(_onClose) => (
                <>
                  <ModalBody className="p-10 flex w-full  items-center justify-center">
                    <Image
                      alt="loader"
                      className="w-[200px] h-[200px]"
                      height={300}
                      src={'/loader.gif'}
                      width={300}
                    />
                    <h2 className="font-bold text-2xl text-primary text-center">
                      Please Wait...Story is Generating !
                    </h2>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
      </div>
    </>
  );
}
