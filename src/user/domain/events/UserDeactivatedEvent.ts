import { DomainEvent } from './DomainEvent';

export class UserDeactivatedEvent implements DomainEvent {
  readonly eventName = 'UserDeactivated';
  readonly occurredAt = new Date();

  constructor(
    public readonly userId: string,
    public readonly reason?: string,
  ) {}
}
