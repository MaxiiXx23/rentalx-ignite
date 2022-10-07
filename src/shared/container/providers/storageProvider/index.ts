import { container } from "tsyringe";

import { LocalStorageProvider } from "./implementations/LocalStorageProvider";
import { S3StorageProvider } from "./implementations/S3StorageProvider";
import { IStorageProvider } from "./IStorageProvider";

// aqui configuração se vms utilizar o S3 ou o LocalStorage através da variável de ambiente
const diskStorage = {
    local: LocalStorageProvider,
    S3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.DISK_OPCION]
);
