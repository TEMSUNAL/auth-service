import { ChapterMembership } from "src/user/domain/entities/ChapterMembership.entity";

export interface CreateUserDTO {
    email: string;
    password: string;
    name: string;
    membership: ChapterMembership[];
    isAdmin: boolean;
}
