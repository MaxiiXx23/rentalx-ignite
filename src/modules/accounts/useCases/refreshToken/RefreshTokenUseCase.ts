import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IPayLoad {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}
    async execute(token: string) {
        const { email, sub } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayLoad;
        const user_id = sub;

        const userToken =
            await this.usersTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token
            );

        if (!userToken) {
            throw new AppError("Refresh Token does not exists!");
        }
        await this.usersTokensRepository.deleteById(userToken.id);

        const expires_date = this.dateProvider.addDays(
            auth.expires_in_refresh_token_day
        );

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: user_id,
            expiresIn: auth.expires_in_refresh_token,
        });
        await this.usersTokensRepository.create({
            expires_date,
            refresh_token,
            user_id: sub,
        });
        return refresh_token;
    }
}

export { RefreshTokenUseCase };
