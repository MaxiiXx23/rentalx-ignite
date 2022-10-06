import { injectable, inject } from "tsyringe";

import { IStorageProvider } from "../../../../shared/container/providers/storageProvider/IStorageProvider";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
    user_id: string;
    avatar_file: string;
}
@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UserRepository")
        private userReposity: IUserRepository,

        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}
    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.userReposity.findById(user_id);

        if (user.avatar) {
            await this.storageProvider.delete(user.avatar, "avatar");
        }

        await this.storageProvider.save(avatar_file, "avatar");

        user.avatar = avatar_file;

        await this.userReposity.create(user);
    }
}

export { UpdateUserAvatarUseCase };
