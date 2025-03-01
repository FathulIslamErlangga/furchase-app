import cookieParser from "cookie-parser";
import express, { Application } from "express";
import "dotenv/config";

export class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.errorHandle();
  }
  configure() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
  }
  routes() {
    // this.app.use("/api");
  }
  errorHandle() {}

  start() {
    const PORT = process.env.PORT;
    this.app.listen(PORT, () => {
      console.log(`Funa app listening at http://localhost:${PORT} 🚀`);
    });
  }
}
