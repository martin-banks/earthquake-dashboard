// Ordinal rules

// st is used with numbers ending in 1 (e.g. 1st, pronounced first)
// nd is used with numbers ending in 2 (e.g. 92nd, pronounced ninety-second)
// rd is used with numbers ending in 3 (e.g. 33rd, pronounced thirty-third)
// As an exception to the above rules, all the "teen" numbers ending with 11, 12 or 13 use -th (e.g. 11th, pronounced eleventh, 112th, pronounced one hundred [and] twelfth)
// th is used for all other numbers (e.g. 9th, pronounced ninth).

export default function (number) {
  const numbers = number.toString().split()
  const lastNumber = numbers[numbers.length - 1]

  let ordinal = null

  if ((number >= 11 && number <= 19)) {
    ordinal = 'th'
  } else if (lastNumber === '1') {
    ordinal = 'st'
  } else if (lastNumber === '2') {
    ordinal = 'nd'
  } else if (lastNumber === '3') {
    ordinal = 'rd'
  } else {
    ordinal = 'th'
  }

  console.log({ ordinal })


  return `${number}${ordinal}`

}
