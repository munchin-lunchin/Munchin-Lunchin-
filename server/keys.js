exports.database = {
  dev: process.env.DEV_DB,
  secret: process.env.SPOTIFY_SECRET
};

exports.yelp = {
  CLIENT_ID: process.env.YELP_ClientID,
  API_KEY: process.env.YELP_API_Key
}
