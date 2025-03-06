import cors from "cors";
const corsOpstion = {
  origin: "http://localhost:3000",
  credential: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const Cors = cors(corsOpstion);
export default Cors;
