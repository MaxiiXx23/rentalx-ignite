import { Repository } from "typeorm";

import { dataSource } from "../../../../../shared/infra/typeorm";
import { ICarsImagesRepository } from "../../../repositories/ICarsImagesRepository";
import { CarImage } from "../entities/CarImage";

class CarsImagesRepository implements ICarsImagesRepository {
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = dataSource.getRepository(CarImage);
    }

    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            image_name,
        });
        await this.repository.save(carImage);
        return carImage;
    }

    async findImgsByCarId(car_id: string): Promise<CarImage[]> {
        const carImgsQuery = this.repository
            .createQueryBuilder()
            .where("car_id = :car_id", { car_id });
        const carImgs = await carImgsQuery.getMany();
        return carImgs;
    }
    async deleteImgCar(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export { CarsImagesRepository };
