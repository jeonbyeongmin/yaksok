export interface TimetablePartition {
  id: string;
  col: number;
  startRow: number;
  endRow: number;
  participantIDs: string[];
}
