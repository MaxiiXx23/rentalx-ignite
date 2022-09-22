import { IsNull, Repository } from "typeorm";

import { dataSource } from "../../../../../shared/infra/typeorm";
import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = dataSource.getRepository(Rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({
            where: { car_id, end_date: IsNull() },
        });

        return openByCar;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        // usar IsNull em vez de null em um where
        const openByUser = await this.repository.findOne({
            where: { user_id, end_date: IsNull() },
        });
        return openByUser;
    }

    async create({
        car_id,
        user_id,
        expect_return_date,
        id,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expect_return_date,
            id,
            end_date,
            total,
        });
        await this.repository.save(rental);
        return rental;
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOneBy({ id });
        return rental;
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: { user_id },
            relations: ["car"],
        });
        return rentals;
    }
}

export { RentalsRepository };
