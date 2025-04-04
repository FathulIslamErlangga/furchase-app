import cookieParser from "cookie-parser";
import express, { Application } from "express";
import "dotenv/config";
import { errorHandler, pageNotFound } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.route";
import Cors from "./middlewares/cors.middleware";
import profileRoute from "./routes/profile.route";
import mailRoute from "./routes/mail.route";
import addressRoute from "./routes/address.route";

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
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
  }
  routes() {
    this.app.use(
      "/api",
      authRoutes(),
      profileRoute(),
      mailRoute(),
      addressRoute()
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
