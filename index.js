const http = require("http");
const fs = require("fs");
const url = require("url");

// const host = "172.125.161.7";
// const port = 8080;

// httpServer.listen(port, host, () => {
//   console.log(`HTTP server running at http://${host}:${port}/`);
// });

const page404 = fs.readFileSync("404.html", "utf-8", (err, data) => {
  if (err) throw err;
  return data;
});

http
  .createServer(function (req, res) {
    const q = url.parse(req.url, true);
    const filename =
      q.pathname === "/" ? "./index.html" : `.${q.pathname}.html`;

    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        console.log(q.pathname);
        res.write(page404);
        return res.end();
      }
      res.writeHead(200, { "Content-Type": "text-html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);

console.log(`HTTP server running at http://$:${8080}/`);
