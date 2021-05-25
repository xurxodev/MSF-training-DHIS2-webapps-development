import { Id } from "./Base";

// maybe a class with validations in the future or a types with extended props
type UserName = string;
type Authority = string;

interface UserData {
    id: Id;
    name: UserName;
    authorities: Authority[];
}

export class User {
    readonly id: Id;
    readonly name: UserName;
    readonly authorities: Authority[];
    readonly isAdmin: boolean;

    private constructor({ id, name, authorities }: UserData) {
        this.id = id;
        this.name = name;
        this.authorities = authorities;
        this.isAdmin = authorities.includes("ALL");
    }

    // Factory method - In the future could return creation errors
    static create(data: UserData) {
        return new User(data);
    }
}
