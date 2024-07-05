export const rateLimiter = (limit, windowMs) => {
  const timestamps = {};

  return (req, res, next) => {
    const ip = req.ip || req.socket.remoteAddress; // Extract IP address
    const now = Date.now();

    if (!timestamps[ip]) {
      timestamps[ip] = [];
    }

    const windowStart = now - windowMs;
    timestamps[ip] = timestamps[ip].filter(
      (timestamp) => timestamp >= windowStart
    );

    if (timestamps[ip].length >= limit) {
      return res.status(429).json({ message: "Too Many Requests" });
    }

    timestamps[ip].push(now);
    next();
  };
};
