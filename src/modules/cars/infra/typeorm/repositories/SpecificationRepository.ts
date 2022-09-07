import { Repository } from "typeorm";

import { dataSource } from "../../../../../shared/infra/typeorm";
import {
    ICreateSpecificationDTO,
    ISpecificationRepository,
} from "../../../repositories/ISpecificationRepository";
import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationRepository {
    private repository: Repository<Specification>;
    constructor() {
        this.repository = dataSource.getRepository(Specification);
    }
    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            name,
            description,
        });
        await this.repository.save(specification);
    }
    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOneBy({ name });
        return specification;
    }
}

export { SpecificationRepository };