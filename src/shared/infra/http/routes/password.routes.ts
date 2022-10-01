import { Router } from "express";

import { ResetPassowordUserController } from "../../../../modules/accounts/useCases/resetPassowordUser/ResetPasswordUserController";
import { SendForgotPasswordEmailController } from "../../../../modules/accounts/useCases/sendForgotPasswordEmail/SendForgotPasswordEmailController";

const passwordRoutes = Router();

const sendForgotPasswordEmailController =
    new SendForgotPasswordEmailController();

const resetPassowordUserController = new ResetPassowordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordEmailController.handle);
passwordRoutes.post("/reset", resetPassowordUserController.handle);

export { passwordRoutes };
