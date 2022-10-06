import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "../../../../../config/upload";
import { IStorageProvider } from "../IStorageProvider";

// este arquivo é somente um exemplo de como usar o S3

class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        // aqui passamos as opções para a instância do S3
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }

    async save(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file);

        const fileContent = await fs.promises.readFile(originalName);

        const ContentType = mime.getType(originalName);

        // aqui faço o upload do arquivo
        await this.client
            .putObject({
                // informamos o 'bucket' e a pasta(folder)

                Bucket: `${process.env.AWS_BUCKET}/${folder}`,

                // Key é o nome do arquivo
                Key: file,

                // licença de acesso, no caso, public-read é para tornar o arquivo Público
                ACL: "public-read",

                // caminho do arquivo
                Body: fileContent,

                // o ContentType é usado para podermos definir que usuário possa ver a imagem através do browser e não baixar a img automáticamente
                ContentType,
            })
            .promise();

        // após o upload temos que remover o arquivo da pasta tmp
        await fs.promises.unlink(originalName);

        return file;
    }
    async delete(file: string, folder: string): Promise<void> {
        // aqui removeremos o arquivo do nosso bucket no S3

        await this.client
            .deleteObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,

                Key: file,
            })
            .promise();
    }
}

export { S3StorageProvider };
