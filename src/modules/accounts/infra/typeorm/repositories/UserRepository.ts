import { Repository } from "typeorm";

import { dataSource } from "../../../../../shared/infra/typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { User } from "../entities/User";

class UserRepository implements IUserRepository {
    private repository: Repository<User>;
    constructor() {
        this.repository = dataSource.getRepository(User);
    }
    async create({
        id,
        name,
        email,
        password,
        driver_license,
        avatar,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            id,
            name,
            email,
            password,
            driver_license,
            avatar,
        });
        await this.repository.save(user);
    }
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({ email });
        return user;
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOneBy({ id });
        return user;
    }
}

export { UserRepository };
