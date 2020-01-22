//const obj = { name: "", surname: "", middleName: "" };
//const obj = { name: "", surname: "", middleName: "Huy" };
// const obj = {};
// const keys = ["name", "surname", "middleName"];
// const isEmpty = require("./utility/isEmpty");
// console.log(isEmpty(obj, keys));

// const num = "";
// console.log(!isNaN(num) || 0);

const Offer = require("./models/Offer");
const modelKeys = require("./utility/modelKeys");
console.log(modelKeys(Offer, ["description", "__v"]));
