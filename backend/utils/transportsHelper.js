export const splitZip = postalCode => postalCode.replace(/(\d)([a-zA-Z])/g, '$1 $2');