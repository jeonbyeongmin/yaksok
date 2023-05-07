import { createPathGenerator } from 'common/utils/path';

export type ParticipantResources = {
  participantId?: string;
};

export type ParticipantQueries = {
  eventId?: string;
};

export const PARTICIPANT_RESOURCE_NAME = 'participants';

export const generateParticipantsPath = createPathGenerator<
  ParticipantResources,
  ParticipantQueries
>({
  resourceName: PARTICIPANT_RESOURCE_NAME,
  resourceIdKey: 'participantId',
});
