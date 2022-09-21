import { injectable, inject } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../infra/typeorm/IRentalsRepository";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,

        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const mininum_daily = 1;

        const rental = await this.rentalsRepository.findById(id);

        const car = await this.carsRepository.findById(rental.car_id);

        if (!rental) {
            throw new AppError("Rental does not exists.");
        }

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        );

        if (daily <= 0) {
            daily = mininum_daily;
        }

        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.expect_return_date
        );

        let total = 0;

        if (delay > 0) {
            const calculete_fine = delay * car.fine_amount;
            total = calculete_fine;
        }
        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;
        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);
        return rental;
    }
}

export { DevolutionRentalUseCase };
