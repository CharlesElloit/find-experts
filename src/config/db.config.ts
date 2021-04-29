import { connect } from "mongoose";

const dbconnection = async (url: any) => {
  try {
    const conn = await connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    if (conn) {
      console.log("Successfully Connected to MongoDB Atlas");
    }
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
  }
};

export default dbconnection;
