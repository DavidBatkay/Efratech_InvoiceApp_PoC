const session = "example-session";
function isValidSession(session) {
  return true;
}
isValidSession(session);

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: isValidSession(session) ? "/dashboard" : "/login",
        permanent: true,
      },
    ];
  },
};
