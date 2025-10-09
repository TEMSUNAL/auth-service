import { DomainError } from './DomainError';

export class EmailAlreadyRegisteredError extends DomainError {
  constructor(email: string) {
    super(`Email already registered: ${email}`);
    this.name = 'EmailAlreadyRegisteredError';
  }
}
