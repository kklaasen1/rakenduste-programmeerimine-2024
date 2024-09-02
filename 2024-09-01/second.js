// 1. Ülesanne: Luua array numbritega ja leida spetsiifilise numbri index

const numbers = [1, 2, 3, 4, 5];

function findIndex(array, num) {
    return array.indexOf(num);
}

console.log(findIndex(numbers, 5));

// 2. Ülesanne: Funktsioon, mis liidab 2 numbrit kokku ja tagastab summa

function addNumbersFn(num1, num2) {
    return num1 + num2;
}

console.log(addNumbersFn(2, 3));

// 3. Ülesanne: ümber kirjutada eelmine arrow funktsiooniks

const addNumbersArrowFn = (num1, num2) => {
    return num1 + num2;
};

console.log(addNumbersArrowFn(3, 4));

// 4. Ülesanne: ümber kirjutada shorthand arrow funktsiooniks

const addNumbersArrowFnShort = (num1, num2) => num1 + num2;

console.log(addNumbersArrowFnShort(1, 5));

// 5. Ülesanne: Luua funktsioon sellisel kujul, et saaks kutsuda välja seda nii: console.log(addNumbersNested(3)(4))

function addNumbersNested(num1) {
    return function (num2) {
        return num1 + num2;
    }
}

console.log(addNumbersNested(3)(99));

// 6. Ülesanne: luua eelmisest funktsioonist arrow funktsioon

const addNumbersNestedAf = num1 => num2 => num1 + num2;

console.log(addNumbersNestedAf(8)(102));

// 7. Ülesanne: AF printida "Hello (nimi)" ja kasutada string literals

const greet = (name = "World") => 'Hello ${name}';

console.log(greet());
console.log(greet("Karmen"));