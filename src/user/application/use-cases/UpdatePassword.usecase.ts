import { UserNotFoundError } from "src/user/domain/errors/UserNotFoundError";
import { UserRepository } from "../../domain/repositories/UserRepository.interface";
import { UpdatePasswordDTO } from "../dto/UpdatePasswordDTO";

export class UpdatePasswordUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(data: UpdatePasswordDTO): Promise<void> {
        const user = await this.userRepository.findById(data.userId);
        if (!user) throw new UserNotFoundError(data.userId);

        user.setPassword(data.newPassword);
        user.touch();

        await this.userRepository.update(user);
    }
}