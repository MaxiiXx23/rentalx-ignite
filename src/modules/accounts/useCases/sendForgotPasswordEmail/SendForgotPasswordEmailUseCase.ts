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

        @inject("EtherealEmailProvider")
        private emailProvider: IEmailProvider
    ) {}

    async execute(email: string): Promise<void> {
        const hours = 3;
        const user = await this.userRepository.findByEmail(email);
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

        await this.emailProvider.sendEmail(
            email,
            "Recuperação de senha",
            `O link para a recuperação é: ${token}`
        );
    }
}

export { SendForgotPasswordEmailUseCase };
