import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const uploadAvatar = multer(uploadConfig);
const usersRoutes = Router();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
    "/avatar",
    uploadAvatar.single("avatar"),
    ensureAuthenticated,
    updateUserAvatarController.handle
);

export { usersRoutes };
