// interface Person<T, K> {
//     name: T;
//     age: K;
//     location: string;
// }

// const func = () => {
//     while (true) {
//         let i = 0;
//         i++;
//     }
// }

// type PersonStringNumber = Person<string, number>;
// type PersonNumberString = Person<number, string>;
// type PersonStringString = Person<string, string>;
// type PersonNumberNumber = Person<number, number>;

// type StringOrNumber = string | number;

// const myUnknownVariable: unknown = {
//     name: "John",
//     age: 30,
//     location: "London"
// };

// const anotherUnknownVariable: Person<string, number> = myUnknownVariable;




type PersonFullName = {
    firstName: string;
    lastName?: string;
    age: number;
};

type PersonName = Partial<PersonFullName>;
type PersonFullName2 = Required<PersonName>;

type PersonLastNameOnly = NonNullable<PersonFullName['lastName']>;