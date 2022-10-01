import { hash } from "bcryptjs";
import { injectable, inject } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPassowordUserUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(
            token
        );

        if (!userToken) {
            throw new AppError("Token Invalid.");
        }

        if (
            this.dateProvider.compareIfBefore(
                userToken.expires_date,
                this.dateProvider.dateNow()
            )
        ) {
            throw new AppError("Token expired.");
        }

        const user = await this.userRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.userRepository.create(user);
        await this.usersTokensRepository.deleteById(userToken.id);
    }
}

export { ResetPassowordUserUseCase };
