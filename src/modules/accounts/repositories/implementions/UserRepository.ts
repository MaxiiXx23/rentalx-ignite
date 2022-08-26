import { Repository } from "typeorm";

import { dataSource } from "../../../../database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {
    private repository: Repository<User>;
    constructor() {
        this.repository = dataSource.getRepository(User);
    }
    async create({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            driver_license,
        });
        await this.repository.save(user);
    }
    async findUserByUsername(name: string): Promise<User> {
        const user = await this.repository.findOneBy({ name });
        return user;
    }
}

export { UserRepository };
