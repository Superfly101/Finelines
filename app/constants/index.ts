export const apiUrl =
  process.env.NODE_ENV == "development"
    ? "http://localhost:5000/api"
    : "https://finelines.azurewebsites.net/api";
