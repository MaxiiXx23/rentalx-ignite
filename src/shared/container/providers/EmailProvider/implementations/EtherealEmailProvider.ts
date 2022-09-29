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

    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        const message = await this.client.sendMail({
            to,
            from: "Rentx <noreplay@rentx.com.br>",
            subject,
            text: body,
            html: body,
        });
        console.log("Message sent: %s", message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemail.getTestMessageUrl(message));
    }
}
export { EtherealEmailProvider };
