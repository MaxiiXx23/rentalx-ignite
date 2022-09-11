import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("cars_image")
class CarImage {
    @PrimaryColumn()
    id?: string;

    // @OneToMany(() => Car, (car) => car.id)
    // @JoinColumn({ name: "car_id" })
    // cars: Car[];

    @Column()
    car_id: string;

    @Column()
    image_name: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { CarImage };
