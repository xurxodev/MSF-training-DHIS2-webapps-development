import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";
import { D2Api } from "../types/d2-api";

export class UserDHIS2Repository implements UserRepository {
    constructor(private api: D2Api) {}

    async getCurrent(): Promise<User> {
        const currentUser = await this.api.currentUser
            .get({
                fields: { id: true, name: true, authorities: true },
            })
            .getData();

        return User.create(currentUser);
    }
}
