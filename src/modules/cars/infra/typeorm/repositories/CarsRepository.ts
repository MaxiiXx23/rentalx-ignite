import { Repository } from "typeorm";

import { dataSource } from "../../../../../shared/infra/typeorm";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = dataSource.getRepository(Car);
    }

    async create({
        id,
        name,
        description,
        daily_rate,
        fine_amount,
        license_plate,
        brand,
        category_id,
        specifications,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            id,
            name,
            description,
            daily_rate,
            fine_amount,
            license_plate,
            brand,
            category_id,
            specifications,
        });
        await this.repository.save(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOneBy({ license_plate });
        return car;
    }
    async findAvailable(
        category_id?: string,
        brand?: string,
        name?: string
    ): Promise<Car[]> {
        // aqui fazemos um QueryBuilder condicional para
        // realizar um consulta e retorno de lista personalizado
        const carsQuery = this.repository
            .createQueryBuilder("c")
            .where("available = :available", { available: true });

        if (category_id) {
            // aqui o andWhere nos permite 'concatenar' os where tanto do carsQuery quanto agora
            carsQuery.andWhere("c.category_id = :category_id", { category_id });
        }

        if (brand) {
            carsQuery.andWhere("c.brand = :brand", { brand });
        }

        if (name) {
            carsQuery.andWhere("c.name = :name", { name });
        }
        // o getMany nos traz vários registros através do carsQuery
        const cars = await carsQuery.getMany();
        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOneBy({ id });
        return car;
    }
}

export { CarsRepository };
