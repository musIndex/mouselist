import cors from "cors";
 // import routes
import Router from "./routes/routes.js";
// import express

import express, { json } from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
//import history from 'connect-history-api-fallback';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
//app.use(history());
app.use(json());
  
 // use router
app.use(Router);

const path = __dirname + '/../frontend/dist/';

app.use(express.static(path));


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

const port = process.env.PORT || 5000;
app.listen( port, () => console.log(`Server running at port ${port}`));