let obj = {
  name: 'hung',
  info: {
    age: 18,
  },
};

const b = obj;

obj = {};
console.log(obj);
console.log(b);
// let newObj1 = { ...obj };
// newObj1.info.age = 20;
// newObj1.name = 'hoa';

// const newObj2 = { ...obj, name: 'hao', info: { age: 25 } };

// console.log(obj);
// console.log(newObj1);
// console.log(newObj2);
// node ./learnJS.js
