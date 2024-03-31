const replaceTemplate = (temp, product) => {
  let output = temp.replaceAll("{%PRODUCTNAME%}", product.productName);
  output = output.replaceAll("{%IMAGE%}", product.image);
  output = output.replaceAll("{%QUANTITY%}", product.quantity);
  output = output.replaceAll("{%PRICE%}", product.price);
  output = output.replaceAll("{%ID%}", product.id);
  output = output.replaceAll("{%FROM%}", product.from);
  output = output.replaceAll("{%DESCRIPTION%}", product.description);
  output = output.replaceAll("{%NUTRIENTS%}", product.nutrients);

  output = output.replaceAll(
    "{%NOT_ORGANIC%}",
    product.organic ? "" : "not-organic"
  );

  return output;
};

module.exports = replaceTemplate;
