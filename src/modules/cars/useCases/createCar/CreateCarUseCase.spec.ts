import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;
describe("Create Car", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    });

    // TDD na prática
    it("should be able to create new car.", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Marca Test",
            category_id: "categoryId",
        });
        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with exists license plate.", async () => {
        await createCarUseCase.execute({
            name: "Name Car1",
            description: "Description Test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Marca Test",
            category_id: "categoryId",
        });
        await expect(
            createCarUseCase.execute({
                name: "Name Car2",
                description: "Description Test",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Marca Test",
                category_id: "categoryId",
            })
        ).rejects.toEqual(new Error("Car already exists."));
    });
    it("should not be able to create a car with available true by default.", async () => {
        const car = await createCarUseCase.execute({
            name: "Name available",
            description: "Description Test",
            daily_rate: 100,
            license_plate: "ABCD-1234",
            fine_amount: 60,
            brand: "Marca Test",
            category_id: "categoryId",
        });
        expect(car.available).toBe(true);
    });
});
