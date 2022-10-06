// Interface criada para podermos ultilizar qualquer tipo de storage em nuvem

interface IStorageProvider {
    save(file: string, folder: string): Promise<string>;
    delete(file: string, folder: string): Promise<void>;
}

export { IStorageProvider };
