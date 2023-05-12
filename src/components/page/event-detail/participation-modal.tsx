import { logOnBrowser } from 'common/utils/log';
import { useEffect, useState } from 'react';

import { createParticipantAPI } from '@/api/participants/create-participant';
import { Button, Flex, Input, Text } from '@/components/primitive';
import { Dialog, DialogContent, DialogTitle } from '@/components/primitive/dialog';
import { darkTheme, styled } from '@/styles/stitches.config';

interface Props {
  eventId: string;
  eventTitle: string;
  changeParticipantId: (participantId: string) => void;
}

export function ParticipationModal({ eventId, eventTitle, changeParticipantId }: Props) {
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

    setIsLoading(true);

    try {
      const { participant } = await createParticipantAPI(
        {},
        {
          name,
          eventId,
          availableIndexes: [],
        },
      );

      changeParticipantId(participant._id);
    } catch (error) {
      logOnBrowser(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog open={open}>
      <DialogContent>
        <ModalContentWrapper direction='column' gap={8}>
          <DialogTitle>
            <Text content={`${eventTitle}에 참여하기`} weight='bold' size='lg' />
          </DialogTitle>
          <InputWrapper direction='column' gap={3} isFull>
            <Input
              value={name}
              onChange={handleNameChange}
              placeholder='이름을 입력해주세요'
              radius='md'
              size='md'
              variant='outline'
            />
          </InputWrapper>
          <Text
            content={error && !name ? error : ''}
            color='red'
            size='xs'
            css={{ textAlign: 'end' }}
          />
          <ButtonWrapper>
            <Button
              colorScheme='gray'
              size='sm'
              radius='lg'
              onClick={handleButtonClick}
              isLoading={isLoading}
            >
              <Text content='확인' />
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
  'width': '$160',
  'px': '$5',

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
