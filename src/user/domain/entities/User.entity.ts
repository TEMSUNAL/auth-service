import { ChapterMembership } from "./ChapterMembership.entity";
import { Chapter } from '../enums/Chapter.enum';
import { Role } from '../enums/Role.enum';
import { UserNotMemberError } from "../errors/UserNotMemberError";
import { UserAlreadyMemberError } from "../errors/UserAlreadyMemberError";
import { DomainEvent } from "../events/DomainEvent";
import { UserRegisteredEvent } from "../events/UserRegisteredEvent";
import { UserDeactivatedEvent } from "../events/UserDeactivatedEvent";
import { UserAddedToChapterEvent } from "../events/UserAddedToChapterEvent";

export class User {
    private _events: DomainEvent[] = [];

    constructor(
        readonly id: string,
        private _isAdmin: boolean,
        private _email: string,
        private _password: string,
        private _memberships: ChapterMembership[] = [],
        private _isActive: boolean = true,
        readonly createdAt: Date = new Date(),
        private _updatedAt: Date = new Date(),
        
    ) {this._events.push(new UserRegisteredEvent(id, _email))}

    // --- Getters (no direct property access) ---
    get isAdmin(): boolean {
        return this._isAdmin;
    }

    get email(): string {
        return this._email;
    }

    get passwordHash(): string {
        return this._password;
    }

    get isExternal(): boolean {
        return this._memberships.length === 0;
    }

    // Get all chapters where user is part of
    get memberships(): ChapterMembership[] {
        return this._memberships;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    // --- Domain behavior (rules that modify state) ---
    setAdminStatus(isAdmin: boolean) {
        this._isAdmin = isAdmin;
    }

    setEmail(newEmail: string) {
        this._email = newEmail;
    } // Implemented on application

    setPassword(hash: string) {
        this._password = hash;
    } // Implemented on application

    addMembership(chapter: Chapter, role: Role) {
        const existing = this._memberships.find(m => m.chapter === chapter);
        if (existing) throw new UserAlreadyMemberError(chapter);
        this._memberships.push(new ChapterMembership(chapter, role));
        this._events.push(new UserAddedToChapterEvent(this.id, chapter, role)); 
    } // Implemented on application

    removeMembership(chapter: Chapter) {
        this._memberships = this._memberships.filter(m => m.chapter !== chapter);
    } // Implemented on application

    changeRoleInChapter(chapter: Chapter, newRole: Role) {
        const membership = this._memberships.find(m => m.chapter === chapter);
        if (!membership) throw new UserNotMemberError(chapter);
        membership.changeRole(newRole);
    } // Implemented on application

    activate() {
        this._isActive = true;
    } 

    deactivate() {
        this._isActive = false;
        this._events.push(new UserDeactivatedEvent(this.id, "No reason specified.")) // Replace with UserDeactivatedEvent when implemented
    }

    touch() {
        this._updatedAt = new Date();
    }
}

