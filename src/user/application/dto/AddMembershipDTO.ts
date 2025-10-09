import { Chapter } from '../../domain/enums/Chapter.enum';
import { Role } from '../../domain/enums/Role.enum';

export interface AddMembershipDTO {
  userId: string;
  chapter: Chapter;
  role: Role;
}
