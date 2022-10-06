import { container } from "tsyringe";

import { IDateProvider } from "./dateProvider/IDateProvider";
import { DayjsDateProvider } from "./dateProvider/implementions/DayjsDateProvider";
import { IEmailProvider } from "./EmailProvider/IEmailProvider";
import { EtherealEmailProvider } from "./EmailProvider/implementations/EtherealEmailProvider";
import { LocalStorageProvider } from "./storageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./storageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./storageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);

container.registerInstance<IEmailProvider>(
    "EtherealEmailProvider",
    new EtherealEmailProvider()
);

// aqui configuração se vms utilizar o S3 ou o LocalStorage através da variável de ambiente

const diskStorage = {
    local: LocalStorageProvider,
    S3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.DISK_OPCION]
);
