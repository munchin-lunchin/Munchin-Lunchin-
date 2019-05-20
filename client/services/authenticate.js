function joesFrontEndCookieParser (str) {
  str = str.split('; ');
  var result = {};
  for (var i = 0; i < str.length; i++) {
    var cur = str[i].split('=');
    result[cur[0]] = cur[1];
  }
  return result;
}

const isAuthenticated = () => {
  const cookiesStr = document.cookie;
  const cookiesObj = joesFrontEndCookieParser(cookiesStr);
  if (cookiesObj.userId) return true;
  return false;
}

export default isAuthenticated;