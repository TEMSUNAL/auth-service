import { DomainError } from './DomainError';

export class UserNotMemberError extends DomainError {
  constructor(chapter: string) {
    super(`User is not part of ${chapter}`);
    this.name = 'UserNotMemberError';
  }
}
