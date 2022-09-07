import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({
        name,
        description,
        daily_rate,
        fine_amount,
        license_plate,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, {
            name,
            description,
            daily_rate,
            fine_amount,
            license_plate,
            brand,
            category_id,
        });
        this.cars.push(car);
        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }
}

export { CarsRepositoryInMemory };