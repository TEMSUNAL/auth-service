import { UserNotFoundError } from "src/user/domain/errors/UserNotFoundError";
import { UserRepository } from "../../domain/repositories/UserRepository.interface";
import { ActivateUserDTO } from "../dto/ActivateUserDTO";

export class ActivateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(data: ActivateUserDTO): Promise<void> {
        const user = await this.userRepository.findById(data.userId);
        if (!user) throw new UserNotFoundError(data.userId);

        if (user.isActive) {
            // User is already active, no action needed
            return;
        }

        user.activate();
        user.touch();

        await this.userRepository.update(user);
    }
}