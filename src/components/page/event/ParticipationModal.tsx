import { Dialog, DialogContent, DialogTitle } from '@/components/primitive/Dialog';
import { darkTheme, styled } from '@/styles/stitches.config';
import { useEffect, useState } from 'react';

import { Button } from '@/components/primitive/Button';
import { CreateParticipantAPI } from '@/api/participants/create-participant';
import { Flex } from '@/components/primitive/Flex';
import { Input } from '@/components/primitive/Input';
import { Text } from '@/components/primitive/Text';
import { logOnBrowser } from 'common/utils/log';
import { useRouter } from 'next/router';

interface ParticipationModalProps {
  eventID: string;
  eventTitle: string;
  participantID: string;
  handleParticipantIDChange: (participantID: string) => void;
  isPossibleCreateParticipant: boolean;
}

function ParticipationModal({
  eventID,
  eventTitle,
  participantID,
  handleParticipantIDChange,
  isPossibleCreateParticipant,
}: ParticipationModalProps) {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleButtonClick = async () => {
    if (!name) {
      setError('이름을 입력해주세요.');
      return;
    }

    if (!isPossibleCreateParticipant) {
      alert('이미 모든 참가자가 참여했어요.');
      router.push('/');
      return;
    }

    setIsLoading(true);

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
    } catch (error) {
      logOnBrowser(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!participantID) {
      setOpen(true);
    }
  }, [participantID]);

  return (
    <Dialog open={open}>
      <DialogContent>
        <ModalContentWrapper direction="column" gap={8}>
          <DialogTitle>
            <Text content={`${eventTitle}에 참여하기`} weight="bold" size="lg" />
          </DialogTitle>
          <InputWrapper direction="column" gap={3} isFull>
            <Input
              value={name}
              onChange={handleNameChange}
              placeholder="이름을 입력해주세요"
              radius="md"
              scale="md"
              variant="outline"
            />
          </InputWrapper>
          <Text
            content={error && !name ? error : ''}
            color="red"
            size="xs"
            css={{ textAlign: 'end' }}
          />
          <ButtonWrapper>
            <Button
              colorScheme="gray"
              size="sm"
              radius="lg"
              onClick={handleButtonClick}
              isLoading={isLoading}>
              <Text content="확인" />
            </Button>
          </ButtonWrapper>
        </ModalContentWrapper>
      </DialogContent>
    </Dialog>
  );
}

const InputWrapper = styled(Flex, {
  color: '$gray800',

  [`.${darkTheme} &`]: {
    color: '$gray400',
  },
});

const ModalContentWrapper = styled(Flex, {
  width: '$160',
  px: '$5',

  '@bp1': {
    width: '$200',
    px: '$10',
  },
});

const ButtonWrapper = styled(Flex, {
  w: '$full',
  justifyContent: 'end',

  mb: '$5',
});

export default ParticipationModal;
