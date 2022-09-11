import { container } from "tsyringe";

import { IDateProvider } from "./dateProvider/IDateProvider";
import { DayjsDateProvider } from "./dateProvider/implementions/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);
