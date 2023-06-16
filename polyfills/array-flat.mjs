export default function flat(array) {
  if (typeof array !== "object") {
    return array;
  } else
    for (let index in array) {
      const entry = array[index];
      if (entry && entry.constructor && entry.constructor.name === "Array") {
        for (let value of entry) {
          array.push(value);
        }
        array.splice(index, 1);
        array = flat(array);
      }
    }
  return array;
}
