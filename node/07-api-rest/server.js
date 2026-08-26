import app from "./app.js";

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`CTRL + Click http://localhost:${PORT} to open the server`);
  console.log(`CTRL+C to stop the server`);
});
