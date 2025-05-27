import cookieParser from "cookie-parser";
import express, { Application } from "express";
import "dotenv/config";
import { errorHandler, pageNotFound } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.route";
import Cors from "./middlewares/cors.middleware";
import profileRoute from "./routes/profile.route";
import mailRoute from "./routes/mail.route";
import addressRoute from "./routes/address.route";
import categoriesRoute from "./routes/categories.route";
import session from "express-session";
import passport from "passport";
import "./utils/passport";
import "./utils/facebook";
import path from "path";
export class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.errorHandle();
  }
  configure() {
    this.app.use(Cors);
    this.app.use(
      session({ secret: "secret", resave: false, saveUninitialized: false })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/public", express.static(path.join(__dirname, "../public")));
  }
  routes() {
    this.app.use(
      "/api",
      authRoutes(),
      profileRoute(),
      mailRoute(),
      addressRoute(),
      categoriesRoute()
    );
  }
  errorHandle() {
    this.app.use(pageNotFound);
    this.app.use(errorHandler);
  }

  start() {
    const PORT = process.env.PORT !== null ? parseInt(process.env.PORT!) : 5000;
    this.app.listen(PORT, () => {
      console.log(`Furchase app listening at http://localhost:${PORT} 🚀`);
    });
  }
}
