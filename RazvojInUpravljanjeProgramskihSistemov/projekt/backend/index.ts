import app from "./server";

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(
    `.env ENVIRONMENT is set to: ${process.env.ENVIRONMENT} \n listening on port:  ${PORT} `
  );
});
