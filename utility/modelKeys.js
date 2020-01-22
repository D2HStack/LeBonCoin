// return keys of a model by excluding keys in excludedKeys
//const lodash = require("lodash");

module.exports = (model, excludedKeys) => {
  // extract all keys of the model
  let result = Object.keys(model.schema.paths);
  //   console.log(result);
  //   console.log(excludedKeys);
  // remove all element of excludeKeys if in result
  for (let i = 0; i < excludedKeys.length; i++) {
    const index = result.indexOf(excludedKeys[i]);
    //console.log("index", index);
    if (index !== -1) {
      result.splice(index, 1);
    }
  }

  return result;
};
