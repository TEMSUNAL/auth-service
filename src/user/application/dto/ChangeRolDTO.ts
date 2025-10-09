import { Role } from '../../domain/enums/Role.enum';
import { Chapter } from '../../domain/enums/Chapter.enum';

export interface ChangeRolDTO {
  userId: string;
  chapter: Chapter;
  newRole: Role;
}