import { EmailAlreadyRegisteredError } from "src/user/domain/errors/EmailAlreadyRegisteredError";
import { InvalidEmailError } from "src/user/domain/errors/InvalidEmailError";
import { UserNotFoundError } from "src/user/domain/errors/UserNotFoundError";
import { UserRepository } from "../../domain/repositories/UserRepository.interface";
import { UpdateEmailDTO } from "../dto/UpdateEmailDTO";
import { validateEmail } from "../../domain/utils/validateEmail";

export class UpdateEmailUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(data: UpdateEmailDTO): Promise<void> {
        if (!validateEmail(data.newEmail)) {
            throw new InvalidEmailError(data.newEmail);
        }

        const user = await this.userRepository.findById(data.userId);
        if (!user) throw new UserNotFoundError(data.userId);

        const existing = await this.userRepository.findByEmail(data.newEmail);
        if (existing) {
            throw new EmailAlreadyRegisteredError(data.newEmail);
        }

        user.setEmail(data.newEmail);
        user.touch();

        await this.userRepository.update(user);
    }
}