interface ICar {
    serialNumber: string;
    capacity: number;
}

type TCarCapacity = Omit<ICar, 'serialNumber'>;

type NullableCar = Partial<ICar>;

const car: TCarCapacity = {
    capacity: 5
}
