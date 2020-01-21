const testArry = [1, 2, 3, 4, 5];

const enableArray = () => {
  return testArry.reduce((acc, current) => {
    return (acc = +current);
  }, 0);
};
console.log(enableArray());
