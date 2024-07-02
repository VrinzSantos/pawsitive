import app from "./app";
import connectDB from "./config/db";

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  await connectDB();
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
