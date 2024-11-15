import express from "express";
import { handleRpc } from "typed-rpc/server";
import { myService } from "./service";

const app = express();

app.use(express.json());
app.post("/api", (req, res, next) => {
  handleRpc(req.body, myService)
    .then((result) => res.json(result))
    .catch(next);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
