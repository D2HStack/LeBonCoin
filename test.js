//const obj = { name: "", surname: "", middleName: "" };
//const obj = { name: "", surname: "", middleName: "Huy" };
const obj = {};
const keys = ["name", "surname", "middleName"];
const isEmpty = require("./utility/isEmpty");
console.log(isEmpty(obj, keys));
