import { Repository } from "typeorm";

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
        const openByCar = await this.repository.findOneBy({ car_id });
        return openByCar;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOneBy({ user_id });
        return openByUser;
    }

    async create({
        car_id,
        user_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expect_return_date: expected_return_date,
        });
        await this.repository.save(rental);
        return rental;
    }
}

export { RentalsRepository };
