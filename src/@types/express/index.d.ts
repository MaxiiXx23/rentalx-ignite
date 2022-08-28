declare namespace Express {
    // Sobrescrevendo interface(tipagem) Request
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
        user: {
            id: string;
        };
    }
}
