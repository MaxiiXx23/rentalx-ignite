import dayjs from "dayjs";

import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/implementions/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: IDateProvider;
describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        dayJsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayJsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("Should be able to create a new Rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Description Test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "12345",
            brand: "test",
        });

        const rental = await createRentalUseCase.execute({
            car_id: car.id,
            user_id: "132567",
            expect_return_date: dayAdd24Hours,
        });
        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new Rental if there is another open to the same user", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "111",
            user_id: "test",
            expect_return_date: dayAdd24Hours,
        });
        await expect(
            createRentalUseCase.execute({
                car_id: "124587",
                user_id: "test",
                expect_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(
            new AppError("There's a rental in progress for user!")
        );
    });
    it("Should not be able to create a new Rental if there is another open to the same car", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "test",
            user_id: "test",
            expect_return_date: dayAdd24Hours,
        });

        await expect(
            createRentalUseCase.execute({
                car_id: "test",
                user_id: "321",
                expect_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError("Car is unavailable."));
    });
    it("Should not be able to create a new Rental with invalid return time", async () => {
        await expect(
            createRentalUseCase.execute({
                car_id: "test",
                user_id: "123",
                expect_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Invalid return time."));
    });
});
