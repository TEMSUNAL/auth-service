import { Chapter } from '../../domain/enums/Chapter.enum';

export interface RemoveMembershipDTO {
  userId: string;
  chapter: Chapter;
}
