const dotenv = {
  API_URL: process.env.API_URL as string,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID as string,
  GITHUB_REDIRECT_URI: process.env.GITHUB_REDIRECT_URI as string
};

export default dotenv;
