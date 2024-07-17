import cors from "cors";
 // import routes
import Router from "./routes/routes.js";
// import express
import express, { json } from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import history from 'connect-history-api-fallback';
const __dirname = dirname(fileURLToPath(import.meta.url));
const path = __dirname + '/views';
const staticFileMiddleware = express.static(path);
console.log("Service static files from path:" + path);

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(json());

app.use(staticFileMiddleware);

app.use(history({
  verbose: true,
  index: 'index.html',
  
}));

app.use(staticFileMiddleware);


app.use(cors());
/*
var corsOptions = {
  origin: '*'
 };
app.use(cors(corsOptions));
*/
app.get('/', function (req,res) {
  res.sendFile(join(path, '/index.html'));
});

 // use router
 app.use(Router);
//Change process.env for vite
const port = process.env.PORT || 3000;
app.listen( port, () => console.log(`Server running at port ${port}`));