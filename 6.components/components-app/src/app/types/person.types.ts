export interface IPerson {
    name: string;
    age: number;
    details: IPersonDetails;
}

export interface IPersonDetails {
    address: string;
    phone: string;
}