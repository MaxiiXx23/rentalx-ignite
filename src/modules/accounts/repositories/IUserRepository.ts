import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findUserByUsername(name: string): Promise<User>;
}

export { IUserRepository };
