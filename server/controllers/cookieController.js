const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  res.cookie('userId', res.locals.id, { maxAge: 5000, httpOnly: true });
  res.json({ authenticated: true });
}

cookieController.checkCookie = (req, res, next) => {
  // const { userId } = req.cookies.userId;
}

module.exports = cookieController;