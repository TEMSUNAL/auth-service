import { UserNotFoundError } from "src/user/domain/errors/UserNotFoundError";
import { UserRepository } from "../../domain/repositories/UserRepository.interface";
import { RemoveMembershipDTO } from "../dto/RemoveMembershipDTO";

export class RemoveMembershipUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(data: RemoveMembershipDTO): Promise<void> {
        const user = await this.userRepository.findById(data.userId);
        if (!user) throw new UserNotFoundError(data.userId);

        const membershipExists = user.memberships.some(
            (m) => m.chapter === data.chapter
        );

        if (!membershipExists) {
            // Membership does not exist, no action needed
            return;
        }

        user.removeMembership(data.chapter);
        user.touch();

        await this.userRepository.update(user);
    }
}