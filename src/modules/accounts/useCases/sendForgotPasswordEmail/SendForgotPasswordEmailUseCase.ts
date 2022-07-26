import { resolve } from "path";
import { injectable, inject } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { IEmailProvider } from "../../../../shared/container/providers/EmailProvider/IEmailProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

@injectable()
class SendForgotPasswordEmailUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("MailProvider")
        private emailProvider: IEmailProvider
    ) {}

    async execute(email: string): Promise<void> {
        const hours = 3;

        const user = await this.userRepository.findByEmail(email);

        const templatePath = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "emails",
            "forgotPassword.hbs"
        );

        if (!user) {
            throw new AppError("User does not exists!");
        }
        const token = uuidV4();
        const expires_date = this.dateProvider.addHours(hours);

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date,
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_PASSWORD_MAIL_URL}${token}`,
        };

        await this.emailProvider.sendEmail(
            email,
            "Recuperação de senha",
            variables,
            templatePath
        );
    }
}

export { SendForgotPasswordEmailUseCase };
