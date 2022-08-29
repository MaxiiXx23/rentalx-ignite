import fs from "fs";

// Caso quisesse poderia otimizar ainda mais a função com o resolve
// import { resolve } from "path";

async function deleteFile(filename: string) {
    try {
        await fs.promises.stat(filename);
    } catch {
        return;
    }
    await fs.promises.unlink(filename);
}

export { deleteFile };
