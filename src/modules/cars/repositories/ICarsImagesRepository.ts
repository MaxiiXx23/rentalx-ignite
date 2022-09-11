import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImagesRepository {
    create(car_id: string, image_name: string): Promise<CarImage>;
    findImgsByCarId(car_id: string): Promise<CarImage[]>;
    deleteImgCar(id: string): Promise<void>;
}

export { ICarsImagesRepository };
