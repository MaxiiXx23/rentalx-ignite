import { injectable, inject } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
    user_id: string;
    avatar_file: string;
}
@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UserRepository") private userReposity: IUserRepository
    ) {}
    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.userReposity.findById(user_id);

        if (user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }

        user.avatar = avatar_file;
        await this.userReposity.create(user);
    }
}

export { UpdateUserAvatarUseCase };
