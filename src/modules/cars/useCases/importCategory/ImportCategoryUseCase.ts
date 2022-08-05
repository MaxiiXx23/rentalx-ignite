import { parse } from "csv-parse";
import fs from "fs";

class ImportCategoryUseCase {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    execute(file: Express.Multer.File): void {
        const stream = fs.createReadStream(file.path);
        const parserFile = parse();
        stream.pipe(parserFile);
        parserFile.on("data", async (line) => {
            console.log(line);
        });
    }
}

export { ImportCategoryUseCase };
