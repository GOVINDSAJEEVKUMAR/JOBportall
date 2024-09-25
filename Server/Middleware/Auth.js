const jwt = require('jsonwebtoken');
const User = require ("../Model/UserSchema")
const Employer = require ("../Model/EmployerSchema")
require("dotenv").config();

const userVerification = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        if (await refreshToken(req, res)) {
            next();
        } else {
            return res.status(401).json({ valid: false, message: "Unauthorized" });
        }
    } else {
        jwt.verify(accessToken, "jwt-secret", (err, userData) => {
            if (err) {
                return res.status(401).json({ valid: false, message: "Invalid token" });
            } else {
                req.email = userData.email;
                next();
            }
        });
    }
};

const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return false;
    } else {
        try {
            const decoded = jwt.verify(refreshToken, "jwt-refresh-secret");
            const newAccessToken = jwt.sign({ email: decoded.email }, "jwt-secret", { expiresIn: "1m" });
            res.cookie('accessToken', newAccessToken, { maxAge: 60000, httpOnly: true, secure: true, sameSite: "strict" });
            return true;
        } catch (err) {
            return false;
        }
    }
};

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.user = user; // Set the user on the request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Please authenticate.' });
    }
};

const restrict = (role) => async (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        let user = await User.findById(decoded._id);
        if (!user) {
            user = await Employee.findById(decoded._id);
        }

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
const isAuthorized = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }
        next();
    };
};

const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
    
    try {
        const decoded = jwt.verify(token, 'JOBportal'); // Use your actual secret key
        req.user = await User.findById(decoded.id).select('-password'); // Exclude password from user object
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(403).json({ message: "Invalid token", success: false });
    }
};
module.exports = { userVerification, refreshToken, auth ,restrict, isAuthenticated, isAuthorized, authenticateUser };
