import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemony } from "../../repositories/in-menory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import "dotenv/config";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-menory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/implementions/DayjsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemony: UserRepositoryInMemony;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepositoryMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
    beforeEach(() => {
        userRepositoryInMemony = new UserRepositoryInMemony();
        usersTokensRepositoryMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();

        authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepositoryInMemony,
            usersTokensRepositoryMemory,
            dateProvider
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

    it("should not be able to authenticate an noneexistent user.", async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: "false@gmail.com",
                password: "1234567",
            })
        ).rejects.toEqual(new Error("Email or password incorrect!"));
    });

    it("should not be able to authenticate with incorrect password.", async () => {
        const user: ICreateUserDTO = {
            email: "userFake@gmail.com",
            password: "1234",
            name: "Name Test Error",
            driver_license: "999999",
        };
        await createUserUseCase.execute(user);
        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "Incorrect Password",
            })
        ).rejects.toEqual(new Error("Email or password incorrect!"));
    });
});
