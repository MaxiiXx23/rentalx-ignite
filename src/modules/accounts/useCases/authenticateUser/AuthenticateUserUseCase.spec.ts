import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemony } from "../../repositories/in-menory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import "dotenv/config";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemony: UserRepositoryInMemony;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        userRepositoryInMemony = new UserRepositoryInMemony();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepositoryInMemony
        );
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemony);
    });

    it("should be able to authenticate an user.", async () => {
        const user: ICreateUserDTO = {
            email: "test@gmail.com",
            password: "123456",
            name: "Name Test",
            driver_license: "000123",
        };
        await createUserUseCase.execute(user);
        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an noneexistent user.", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@gmail.com",
                password: "1234567",
            });
        }).rejects.toBeInstanceOf(Error);
    });

    it("should not be able to authenticate with incorrect password.", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                email: "userFake@gmail.com",
                password: "1234",
                name: "Name Test Error",
                driver_license: "999999",
            };
            await createUserUseCase.execute(user);
            await authenticateUserUseCase.execute({
                email: user.email,
                password: "Incorrect Password",
            });
        }).rejects.toBeInstanceOf(Error);
    });
});
