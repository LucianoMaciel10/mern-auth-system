import moongose from "mongoose";

const connectDB = async () => {
  moongose.connection.on("connected", () => console.log("Database Connected"));
  await moongose.connect(`${process.env.MONGODB_URI}/mern-auth-v2`);
};

export default connectDB;
