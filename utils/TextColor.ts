/* takes any number colors and cases. if the text matches a cases return color with the same index */
export const changeColor = (text: string, [...colors], [...cases]): string => {

  let chosenColor = colors.filter((color, i) => text === cases[i])

  return chosenColor[0]
}

const cases = ['Apartment', 'House', 'Condominium']
const colors = ['#19c89f', '#1ac1dd', '#f70070']


// console.log(changeColor('Condo', colors, cases))
