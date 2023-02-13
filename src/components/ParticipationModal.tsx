import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { CreateParticipantAPI } from '@/api/participants/create-participant';

interface ParticipationModalProps {
  eventID: string;
  eventTitle: string;
  participantID: string;
  handleParticipantIDChange: (participantID: string) => void;
}

function ParticipationModal({
  eventID,
  eventTitle,
  participantID,
  handleParticipantIDChange,
}: ParticipationModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const { participant } = await CreateParticipantAPI({
        name,
        eventID,
      });

      if (participant) {
        handleParticipantIDChange(participant._id);
        setIsOpen(false);
      }
    } catch (error) {}
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!participantID) {
      setIsOpen(true);
    }
  }, [participantID]);

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      isCentered
      onClose={handleModalClose}
    >
      <ModalOverlay />
      <ModalContent userSelect="none">
        <ModalHeader>{`${eventTitle} 참여하기`}</ModalHeader>
        <ModalBody pb={6}>
          <Text mb={3} fontWeight="bold" color="gray.600">
            이름
          </Text>
          <Input
            value={name}
            onChange={handleNameChange}
            placeholder="이름을 입력해주세요"
          />
        </ModalBody>

        <ModalFooter>
          <Button fontSize="sm" onClick={handleButtonClick}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ParticipationModal;
