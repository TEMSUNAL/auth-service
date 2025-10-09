import { UserNotFoundError } from "src/user/domain/errors/UserNotFoundError";
import { UserRepository } from "../../domain/repositories/UserRepository.interface";
import { ChangeRolDTO } from "../dto/ChangeRolDTO";

export class ChangeRoleUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(data: ChangeRolDTO): Promise<void> {
        const user = await this.userRepository.findById(data.userId);
        if (!user) throw new UserNotFoundError(data.userId);

        const membership = user.memberships.find(
            (m) => m.chapter === data.chapter
        );

        if (!membership) {
            // Membership does not exist, cannot change role
            return;
        }

        user.changeRoleInChapter(data.chapter, data.newRole);
        user.touch();

        await this.userRepository.update(user);
    }
}