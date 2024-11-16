const jwt = require("jsonwebtoken");
const secret ="a1sdd782x8d9ljgvxmg@dtcfmv82546fuckyouzchg"

// Get the user from JWT token and add user ID to req object
const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");

    // Check if the token is present
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        // Verify the token
        const data = jwt.verify(token, secret);
        // Attach user to req object
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchuser;
