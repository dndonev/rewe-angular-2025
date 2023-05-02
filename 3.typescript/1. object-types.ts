const person: { firstName: string } = {
    firstName: 'Dobrin'
}

interface IPerson {
    firstName: string;
}

const p1: IPerson = {
    firstName: 'DDD'
}

class Person {
    constructor(public firstName: string) { }
}

type TPerson = { firstName: string };

enum EPerson {
    GoodPerson = 'Good',
    BadPerson = 'Bad'
}
