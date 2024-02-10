"use client";

import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
} from "@nextui-org/react";

const Md = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    onOpen();
  }, []);
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-slate-700">
                <span className="text-red-700">Important </span>
              </ModalHeader>
              <Divider />
              <ModalBody>
                <p>
                  Please note this software provides counselling services using
                  generative AI technology. While we aim to offer helpful
                  support, it is essential to understand that this is not a
                  replacement for professional medical or psychological advice.
                </p>
                <p>
                  Users are encouraged to seek appropriate professional
                  assistance for serious or urgent matters. Additionally, all
                  interactions within the app are treated with confidentiality,
                  and user privacy is prioritized.
                </p>
                <p>
                  By using this software, you acknowledge and agree to these
                  terms.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Agree
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Md;
