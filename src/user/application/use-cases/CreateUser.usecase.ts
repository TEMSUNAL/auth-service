// application/use-cases/CreateUser.usecase.ts
import { UserRepository } from '../../domain/repositories/UserRepository.interface';
import { User } from '../../domain/entities/User.entity';
import { IdGenerator } from '../../domain/ports/IdGenerator';
import { CreateUserDTO } from '../dto/CreateUserDTO';
import { validateEmail } from '../../domain/utils/validateEmail';
import { InvalidEmailError } from 'src/user/domain/errors/InvalidEmailError';
import { EmailAlreadyRegisteredError } from 'src/user/domain/errors/EmailAlreadyRegisteredError';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute(data: CreateUserDTO): Promise<void> {
    if (!validateEmail(data.email)) {
      throw new InvalidEmailError(data.email);
    }

    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new EmailAlreadyRegisteredError(data.email);
    }

    const user = new User(this.idGenerator.generate(), data.isAdmin, data.email, data.password);
    await this.userRepository.save(user);
  }
}
