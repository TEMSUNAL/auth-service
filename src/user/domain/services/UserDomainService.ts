import { User } from '../entities/User.entity';
import { Chapter } from '../enums/Chapter.enum';
import { Role } from '../enums/Role.enum';
import { UserNotMemberError } from '../errors/UserNotMemberError';
import { UserAlreadyMemberError } from '../errors/UserAlreadyMemberError';

export class UserDomainService {
  addUserToChapter(user: User, chapter: Chapter, role: Role) {
    if (user.hasRoleInChapter(chapter, role)) {
      throw new UserAlreadyMemberError(chapter);
    }
    user.addMembership(chapter, role);
  }

  removeUserFromChapter(user: User, chapter: Chapter) {
    if (user.isExternal || !user.memberships.some(m => m.chapter === chapter)) {
      throw new UserNotMemberError(chapter);
    }
    user.removeMembership(chapter);
  }
}