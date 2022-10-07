import { container } from "tsyringe";

import { IEmailProvider } from "./IEmailProvider";
import { EtherealEmailProvider } from "./implementations/EtherealEmailProvider";
import { SESEmailProvider } from "./implementations/SESEmailProvider";

const mailProvider = {
    ethereal: container.resolve(EtherealEmailProvider),
    ses: container.resolve(SESEmailProvider),
};

container.registerInstance<IEmailProvider>(
    "MailProvider",
    mailProvider[process.env.MAIL_PROVIDER_OPCION]
);
