const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  // httpOnly is set to false bc it's necessary for the authentication function
  // would be great to adjust but good enough for now
  res.cookie('userId', res.locals.id, { maxAge: 50000, httpOnly: false });
  res.json({ authenticated: true });
}

cookieController.checkCookie = (req, res, next) => {
  // const { userId } = req.cookies.userId;
}

module.exports = cookieController;