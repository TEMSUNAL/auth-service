import { DomainError } from './DomainError';

export class UserAlreadyMemberError extends DomainError {
  constructor(chapter: string) {
    super(`User is already a member of ${chapter}`);
    this.name = 'UserAlreadyMemberError';
  }
}
