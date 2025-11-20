import jwt from "jsonwebtoken";

export const auth = (role = null) => {
  return (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ msg: "Sin autorización" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (role && decoded.role !== role) {
        return res.status(403).json({ msg: "No tenés permisos" });
      }

      next();
    } catch (err) {
      res.status(401).json({ msg: "Token inválido" });
    }
  };
};
