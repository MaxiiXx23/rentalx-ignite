import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({
        id,
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
            id,
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

    async findAvailable(
        category_id?: string,
        brand?: string,
        name?: string
    ): Promise<Car[]> {
        const cars = this.cars.filter((car) => {
            if (
                car.available === true ||
                (category_id && car.category_id === category_id) ||
                (brand && car.brand === brand) ||
                (name && car.name === name)
            ) {
                return car;
            }
            return null;
        });

        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = this.cars.find((car) => car.id === id);
        return car;
    }
}

export { CarsRepositoryInMemory };
