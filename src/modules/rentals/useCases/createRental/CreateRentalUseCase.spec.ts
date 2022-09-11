import dayjs from "dayjs";

import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/implementions/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: IDateProvider;
describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        dayJsDateProvider = new DayjsDateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayJsDateProvider
        );
    });

    it("Should be able to create a new Rental", async () => {
        const rental = await createRentalUseCase.execute({
            car_id: "124587",
            user_id: "132567",
            expected_return_date: dayAdd24Hours,
        });
        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new Rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "124587",
                user_id: "test",
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                car_id: "124587",
                user_id: "test",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    it("Should not be able to create a new Rental if there is another open to the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "test",
                user_id: "123",
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                car_id: "test",
                user_id: "321",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    it("Should not be able to create a new Rental with invalid return time", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "test",
                user_id: "123",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
