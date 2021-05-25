import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";
import userData from "./user.json";

export class UserInMemoryRepository implements UserRepository {
    async getCurrent(): Promise<User> {
        return User.create(userData);
    }
}
