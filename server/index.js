import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comment.js";
import rateLimit from "express-rate-limit";

const PORT = process.env.PORT || 5500;
const db_user = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const DB_CON_URL = `mongodb+srv://${db_user}:${db_password}@cluster0.fu2jd.gcp.mongodb.net/mern-with-next?retryWrites=true&w=majority`;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2, // Limit each IP to 2 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(cors()); /* use cors */

app.use(["/posts/like", "/posts/dislike"], limiter); // Apply the rate limiting middleware to all requests

app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

/* Root Route */
app.get("/", function (req, res) {
  res.send("Hello World From Server");
});

/* Posts Routes */
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

/* mongodb connection */
mongoose
  .connect(DB_CON_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      return console.log("🚀 Server Is Up & Running On Port : " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
