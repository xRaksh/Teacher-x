const jwt = require('jsonwebtoken');

// const checkAuth = (req, res, next) => {
//   // grab token from cookie
//   const token = req.cookies.authToken;

//   // if no token, stop there
//   if (!token) {
//     return res.status(403).redirect('/login');
//   }

//   // decode the token and get the id
//   try {
//     const decode = jwt.verify(token, 'shhh');
//     console.log(decode);
//   } catch (error) {
//     console.log(error);
//     return res.status(401).send("Invalid token");
//   }

//   // query to DB for that user id

//   return next();
// };

const checkAuth = (req, res, next) => {
  // Extract the JWT token from the request (e.g., from a cookie or authorization header)
  const token = req.cookies.token || req.headers.authorization;
  if (!token) {
    return res.redirect('/login')
    // return res.status(401).json({ success: false, message: 'Authentication required' });
  }
  // Verify the JWT token's signature using the secret key
  jwt.verify(token, 'shhh', (err, decoded) => {
    if (err) {
      return res.redirect('/login')
      // return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // Attach the user identifier to the request object
    req.userId = decoded.userId;
    next();
  });
}

module.exports = { checkAuth };
