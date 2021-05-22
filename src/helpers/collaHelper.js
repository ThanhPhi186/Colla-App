export const removeDiacritics = (txt) => {
  return txt
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

// function compareObj(objA, objB) {
//   if (Object.keys(objA).length != Object.keys(objb).length) {
//     return false;
//   }

//   for (const key in objA) {
//     if (objA[key] != objB[key]) {
//       return false;
//     }
//   }

//   return true;
// }

// const a = array.filter((item, index) => {
//   for (let i = 0; i < array.length; i++) {
//     const itemToCompare = array[i];
//     if (compareObj(item, itemToCompare) && index != i) {
//       return false;
//     }
//     return true;
//   }
// });
