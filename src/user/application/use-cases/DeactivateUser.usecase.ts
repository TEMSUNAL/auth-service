import { UserNotFoundError } from "src/user/domain/errors/UserNotFoundError";
import { UserRepository } from "../../domain/repositories/UserRepository.interface";
import { DeactivateUserDTO } from "../dto/DeactivateUserDTO";

export class DeactivateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(data: DeactivateUserDTO): Promise<void> {
        const user = await this.userRepository.findById(data.userId);
        if (!user) throw new UserNotFoundError(data.userId);

        if (!user.isActive) {
            // User is already deactived, no action needed
            return;
        }

        user.deactivate();
        user.touch();

        await this.userRepository.update(user);
    }
}