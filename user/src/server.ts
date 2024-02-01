import app from "./app";

const PORT = process.env.PORT || 3000;

export const StartServer = async () => {
  app.listen(PORT, () => {
    console.log(`User-service is listening to ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    console.log(err);
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log("server is up");
});
