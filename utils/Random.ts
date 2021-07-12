export function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function countBoomerangs(arr) {
  let counter = 0 
  arr.forEach((val, i) => {
      if(arr[i + 2] === val && arr[i + 1] !== val) {
        counter++
      }
  })
  
  return counter
}

console.log(countBoomerangs([2, 1, 2, 1, 5, 1, 5, 1, 5, 6, 2, 6, 5]))

console.log(countBoomerangs([9, 5, 9, 5, 1, 1, 1])) 
// ➞ 2
console.log(countBoomerangs([5, 6, 6, 7, 6, 3, 9])) 
// ➞ 1
console.log(countBoomerangs([4, 4, 4, 9, 9, 9, 9])) 
// ➞ 0

