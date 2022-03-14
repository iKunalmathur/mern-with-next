/* Is Object any prop is empty */
export function isObjEmpty(object) {
  let isEmpty = false;

  for (const property in object) {
    // console.log(`${property}: ${object[property]}`);
    if (!isEmpty) {
      isEmpty = object[property].length ? false : true;
    }
  }
  return isEmpty;
}

// make text capitalize
export function capitalize(word) {
  return word
    .toLowerCase()
    .replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
}
