
exports.currentUser = (req, res) => {
  return res.json({ currentUser: req.user });
};
