import { DomainEvent } from './DomainEvent';

export class UserRegisteredEvent implements DomainEvent {
  readonly eventName = 'UserRegistered';
  readonly occurredAt = new Date();

  constructor(
    public readonly userId: string,
    public readonly email: string,
  ) {}
}
