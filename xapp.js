// const http = require('http');
// const xlsx = require("xlsx");

// const workbook = xlsx.readFile("data/teste.xlsx")
// let worksheet = workbook.Sheets[workbook.SheetNames[0]];

// for (let index = 2; index < 10; index++){
//     const id = worksheet[`A${index}`].v
//     const name = worksheet[`B${index}`].v

//     console.log({
//         id: id,
//         name: name,
//     })
// }

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//    res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });