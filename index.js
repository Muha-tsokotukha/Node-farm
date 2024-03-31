const http = require("http");
const url = require("url");
const fs = require("fs");
const replaceTemplate = require("./modules/replaceTemplate");

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  switch (pathname) {
    case "/":
    case "/overview":
      res.writeHead(200, { "Content-type": "text/html" });

      const cardsHtml = dataObj
        .map((el) => replaceTemplate(templateCard, el))
        .join("");
      const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

      res.end(output);
      break;

    case "/product":
      res.writeHead(200, { "Content-type": "text/html" });
      const product = dataObj[query.id];
      const productHtml = replaceTemplate(templateProduct, product);

      res.end(productHtml);
      break;

    case "/api":
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
      break;

    default:
      res.writeHead(404, {
        "Content-type": "text/html",
        "my-own-header": "hello-world",
      });
      res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000");
});
