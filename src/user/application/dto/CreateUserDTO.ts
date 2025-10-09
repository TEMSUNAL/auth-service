import { ChapterMembership } from "src/user/domain/entities/ChapterMembership.entity";

export interface CreateUserDTO {
    isAdmin: boolean;
    email: string;
    password: string;
}
