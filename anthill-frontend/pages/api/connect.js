export default (req, res) => fetch("http://localhost:3001/connect").then(() => {
    res.statusCode = 200;
    res.json({});
  });
