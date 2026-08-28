import app from "./app.js";
import { sincronizar } from "./src/database/index.js";

/* global process */

const PORT = 3001;

// O servidor só sobe depois que o banco está pronto: com DB_SYNC_FORCE=true as
// tabelas são recriadas e semeadas antes do primeiro pedido chegar.
sincronizar()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`CTRL + Click http://localhost:${PORT} to open the server`);
      console.log(`CTRL+C to stop the server`);
    });
  })
  .catch((e) => {
    console.error("Falha ao preparar o banco:", e.message);
    process.exit(1);
  });
