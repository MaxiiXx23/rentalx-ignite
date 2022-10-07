import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "../../../../shared/container/providers/storageProvider/IStorageProvider";
import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carsImagesRepository: ICarsImagesRepository,

        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        const carImgs = await this.carsImagesRepository.findImgsByCarId(car_id);

        if (carImgs) {
            carImgs.map(async (carImg) => {
                await this.carsImagesRepository.deleteImgCar(carImg.id);
                await this.storageProvider.delete(carImg.image_name, "cars");
            });
        }

        images_name.map(async (image) => {
            await this.carsImagesRepository.create(car_id, image);
            await this.storageProvider.save(image, "cars");
        });
    }
}

export { UploadCarImagesUseCase };
