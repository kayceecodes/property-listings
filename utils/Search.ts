import { convertNameToHandle } from './Parse';

/**
   *  Identifies an item by name.
   *  Uses an array of items.
   *  Compares it to a path from it's param.
   * @params {nameOfBracelet} string - this will take a name from asPath of router object
   * @return {void}
   */
  export const findItemByPath = (path: string, items: any[], prefix: string) => {
console.log('Path: ', path)
console.log('Array of Items: ', items)
console.log('Prefix: ', prefix)
    const foundItem = items.find((item) => {
      if (prefix + convertNameToHandle(item.name) === path) {
        console.log(
          "Prefixes and name",
          prefix + " " + path + " " + convertNameToHandle(item.name)
        );
    
      }
    });

    console.log("findItemByPath -> Found Bracelet ", foundItem);
    return foundItem
  };


  function countBoomerangs(arr) {
    let counter = 0 
    arr.forEach((val, i) => {
        if(arr[i + 2] === val) {
          counter++
        }
    })
    
    return counter
  }

  console.log(countBoomerangs([2,1,2,1,5,1, 5]))