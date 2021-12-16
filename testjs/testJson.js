const str = '{"key":"value"}';

const obj = JSON.parse(str);

console.log(obj.key);

const obj2 = {
    key: "Sudharma",
};

console.log(JSON.stringify(obj2, null, 2));
