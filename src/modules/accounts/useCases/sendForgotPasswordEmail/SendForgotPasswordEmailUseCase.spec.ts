import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/implementions/DayjsDateProvider";
import { EmailProviderInMemory } from "../../../../shared/container/providers/EmailProvider/in-memory/EmailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UserRepositoryInMemony } from "../../repositories/in-menory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-menory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordEmailUseCase } from "./SendForgotPasswordEmailUseCase";

let sendForgotPasswordEmailUseCase: SendForgotPasswordEmailUseCase;

let userRepositoryInMemory: UserRepositoryInMemony;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

let dateProvider: DayjsDateProvider;
let emailProviderInMemory: EmailProviderInMemory;

describe("Send Forgot Email", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemony();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        emailProviderInMemory = new EmailProviderInMemory();

        sendForgotPasswordEmailUseCase = new SendForgotPasswordEmailUseCase(
            userRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            emailProviderInMemory
        );
    });

    it("Should be eble to send forgot  password e-mail to user", async () => {
        const sendEmail = spyOn(emailProviderInMemory, "sendEmail");

        await userRepositoryInMemory.create({
            email: "huoki@irgapli.ht",
            password: "12345",
            driver_license: "902299",
            name: "Terry Becker",
        });

        await sendForgotPasswordEmailUseCase.execute("huoki@irgapli.ht");

        expect(sendEmail).toHaveBeenCalled();
    });

    it("Should not be able to send e-mail if user does not exists.", async () => {
        await expect(
            sendForgotPasswordEmailUseCase.execute("emailtest@test.com")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("Should be able to create an users tokens.", async () => {
        const generateTokenEmail = spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );

        await userRepositoryInMemory.create({
            email: "huwefgu@su.lk",
            password: "12345",
            driver_license: "379305",
            name: "Carlos Romero",
        });

        await sendForgotPasswordEmailUseCase.execute("huwefgu@su.lk");

        expect(generateTokenEmail).toHaveBeenCalled();
    });
});
