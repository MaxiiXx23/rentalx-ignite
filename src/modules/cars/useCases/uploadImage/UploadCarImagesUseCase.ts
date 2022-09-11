import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carsImagesRepository: ICarsImagesRepository
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        const carImgs = await this.carsImagesRepository.findImgsByCarId(car_id);

        if (carImgs) {
            carImgs.map(async (carImg) => {
                await this.carsImagesRepository.deleteImgCar(carImg.id);
                await deleteFile(`./tmp/cars/${carImg.image_name}`);
            });
        }

        images_name.map(async (image) => {
            await this.carsImagesRepository.create(car_id, image);
        });
    }
}

export { UploadCarImagesUseCase };
