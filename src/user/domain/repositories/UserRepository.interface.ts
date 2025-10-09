import { User } from '../entities/User.entity';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
}

export interface UserRepositoryWithDelete extends UserRepository {
  delete(id: string): Promise<void>;
}