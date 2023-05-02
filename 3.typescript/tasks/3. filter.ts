interface Person {
    name: string;
    age: number;
    city: string;
}

function filterPeopleByAge(people: Person[], minAge: number): Person[] {
    return people.filter(person => person.age >= minAge);
}