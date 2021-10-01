import express from "express";
import morgan from "morgan";
import cors from "cors";
// Importing routes
import characters from "./routes/characters.routes";
import movies from "./routes/movies.routes";
import series from "./routes/series.routes";
import users from "./routes/users.routes";
//importing helpers
import authToken from "./helpers/verifyToken";

const app = express();

app.set("PORT", process.env.PORT || 4000);

app.get("/", (req, res) => {
  res.send("This is the home page");
});

// midddlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/users", users);
app.use("/api/characters", authToken, characters);
app.use("/api/series", /* authToken, */ series);
app.use("/api/movies", /*  authToken, */ movies);

// Server listen
app.listen(app.get("PORT"), (req, res) => {
  console.log(`Server listen on Port ${app.get("PORT")}`);
});
