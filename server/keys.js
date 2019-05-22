exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.database = {
  dev: process.env.DEV_DB,
  secret: process.env.SPOTIFY_SECRET
};

exports.yelp = {
  CLIENT_ID: process.env.YELP_ClientID,
  API_KEY: process.env.YELP_API_Key
}
