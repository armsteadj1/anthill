export default (req, res) => fetch("http://localhost:3001/disconnect").then(() => {
    res.statusCode = 200;
    res.json({});
  });
