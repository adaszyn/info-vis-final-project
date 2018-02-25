const CONFIG = {
  apiBase:
    process.env.NODE_ENV === "production"
      ? "https://info-vis-api.herokuapp.com"
      : "http://localhost:3000",
};
export default CONFIG;
