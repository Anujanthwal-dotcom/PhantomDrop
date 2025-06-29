import rateLimit from "express-rate-limit";

const downloadLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many download requests from this IP, please try again later."
});

export default downloadLimiter;