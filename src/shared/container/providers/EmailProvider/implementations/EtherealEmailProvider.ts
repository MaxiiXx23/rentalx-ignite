import fs from "fs";
import handlebars from "handlebars";
import nodemail, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IEmailProvider } from "../IEmailProvider";

@injectable()
class EtherealEmailProvider implements IEmailProvider {
    private client: Transporter;

    constructor() {
        nodemail
            .createTestAccount()
            .then((account) => {
                const transporter = nodemail.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass,
                    },
                });
                this.client = transporter;
            })
            .catch((err) => console.error(err));
    }

    async sendEmail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        // aqui transformo o arquivo lido para formatado 'handlebars'
        const templateParse = handlebars.compile(templateFileContent);

        // aqui passo as variávies que serão inseridas no body
        const templateHTML = templateParse(variables);

        const message = await this.client.sendMail({
            to,
            from: "Rentx <noreplay@rentx.com.br>",
            subject,
            html: templateHTML,
        });

        console.log("Message sent: %s", message.messageId);
        console.log("Preview URL: %s", nodemail.getTestMessageUrl(message));
    }
}
export { EtherealEmailProvider };
