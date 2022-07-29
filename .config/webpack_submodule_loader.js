const regx = /\/\*\* __in_submodule__([\w\W]*?)[\*+]\//g;

function addSubmoduleCode(sourceCode) {
  let currentCode = sourceCode;
  const res = sourceCode.match(regx);
  if (res && res.length) {
    res.forEach((str) => {
      currentCode = currentCode.replace(str, replaceCode(str));
    });
  }
  return currentCode;
}

function replaceCode(someCode) {
  const replacedCode = someCode.replace(regx, (str, code) => {
    return code;
  });
  return replacedCode;
}

module.exports = addSubmoduleCode;
