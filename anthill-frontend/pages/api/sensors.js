export default (req, res) => fetch("http://localhost:3001/sensors").then((response) => {
    res.statusCode = 200;
    return response.json().then((json) => {
      res.json(JSON.stringify(json));
    });
  });
