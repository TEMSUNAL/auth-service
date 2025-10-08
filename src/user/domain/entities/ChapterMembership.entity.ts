import { Chapter } from '../enums/Chapter.enum';
import { Role } from '../enums/Role.enum';


export class ChapterMembership {
  constructor(
    readonly chapter: Chapter,
    private _role: Role,
  ) {}

  get role(): Role {
    return this._role;
  }

  changeRole(newRole: Role) {
    this._role = newRole;
  }
}