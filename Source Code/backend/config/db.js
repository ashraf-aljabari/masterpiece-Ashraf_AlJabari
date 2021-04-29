import mongoose from 'mongoose';

// connecting our backend with mongoDB using mongoose package
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(
      `MongoDB is Connected successfully: ${conn.connection.host}`.cyan
        .underline
    );
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
