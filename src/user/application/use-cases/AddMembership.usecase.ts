import { UserRepository } from '../../domain/repositories/UserRepository.interface';
import { UserNotFoundError } from 'src/user/domain/errors/UserNotFoundError';
import { AddMembershipDTO } from '../dto/AddMembershipDTO';

export class AddMembershipUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: AddMembershipDTO): Promise<void> {
    const user = await this.userRepository.findById(data.userId);
    if (!user) throw new UserNotFoundError(data.userId);

    const membershipExists = user.memberships.some(
      (m) => m.chapter === data.chapter
    );

    if (!membershipExists) {
      // Membership do not exists, no action needed
      return;
    }

    user.removeMembership(data.chapter);
    user.touch();

    await this.userRepository.update(user);
  }
}
