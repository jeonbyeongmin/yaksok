import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/primitive/Dialog';
import { useEffect, useState } from 'react';

import { Button } from '@/components/primitive/Button';
import { CreateParticipantAPI } from '@/api/participants/create-participant';
import { Flex } from '@/components/primitive/Flex';
import { Input } from '@/components/primitive/Input';
import { Text } from '@/components/primitive/Text';
import { styled } from '@/styles/stitches.config';

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
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const { participant } = await CreateParticipantAPI({
        name,
        eventID,
        availableIndexes: [],
      });

      if (participant) {
        handleParticipantIDChange(participant._id);
        setOpen(false);
      }
    } catch (error) {}
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!participantID) {
      setOpen(true);
    }
  }, [participantID]);

  return (
    <Dialog open={open}>
      <DialogContent>
        <ModalContentWrapper direction="column">
          <DialogTitle>
            <Text
              content={`${eventTitle}에 참여하기`}
              weight="bold"
              color="gray800"
              size="lg"
            />
          </DialogTitle>
          <Flex direction="column" gap={3} isFull>
            <Text content="이름" weight="bold" color="gray600" />
            <Input
              value={name}
              onChange={handleNameChange}
              placeholder="이름을 입력해주세요"
              radius="md"
            />
          </Flex>
          <ButtonWrapper>
            <Button color="gray100" onClick={handleButtonClick} radius="lg">
              <Text content="확인" />
            </Button>
          </ButtonWrapper>
        </ModalContentWrapper>
      </DialogContent>
    </Dialog>
  );
}

const ModalContentWrapper = styled(Flex, {
  width: '$200',
  px: '$10',
});

const ButtonWrapper = styled(Flex, {
  w: '$full',
  justifyContent: 'end',
  mt: '$10',
  mb: '$5',
});

export default ParticipationModal;
