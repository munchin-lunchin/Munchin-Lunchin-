const authenticate = {};

// cookies look like this 'UserId=hello; timeout=hello'
authenticate.cookieParser = function (str) {
  str = str.split('; ');
  var result = {};
  for (var i = 0; i < str.length; i++) {
    var cur = str[i].split('=');
    result[cur[0]] = cur[1];
  }
  return result;
}

authenticate.isAuthenticated = function () {
  const cookiesStr = document.cookie;
  const cookiesObj = authenticate.cookieParser(cookiesStr);
  if (cookiesObj.userId) return true;
  return false;
}

module.exports = authenticate;