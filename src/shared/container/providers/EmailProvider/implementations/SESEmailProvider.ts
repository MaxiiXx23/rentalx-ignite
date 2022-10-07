import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemail, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IEmailProvider } from "../IEmailProvider";

@injectable()
class SESEmailProvider implements IEmailProvider {
    private client: Transporter;

    constructor() {
        this.client = nodemail.createTransport({
            SES: new SES({
                apiVersion: "2010-12-01",
                region: process.env.AWS_REGION,
            }),
        });
    }

    async sendEmail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse(variables);

        // aqui é necessário passar o email que foi validado no SES
        await this.client.sendMail({
            to,
            from: "Rentx <emailvalido@rentx.com.br>",
            subject,
            html: templateHTML,
        });
    }
}
export { SESEmailProvider };
