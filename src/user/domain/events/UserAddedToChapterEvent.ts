import { DomainEvent } from './DomainEvent';
import { Chapter } from '../enums/Chapter.enum';
import { Role } from '../enums/Role.enum';

export class UserAddedToChapterEvent implements DomainEvent {
  readonly eventName = 'UserAddedToChapter';
  readonly occurredAt = new Date();

  constructor(
    public readonly userId: string,
    public readonly chapter: Chapter,
    public readonly role: Role,
  ) {}
}
