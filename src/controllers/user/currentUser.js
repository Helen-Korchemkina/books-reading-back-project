const currentUser = async (req, res) => {
  const { _id, name, email, startTraining, finishTraining, createdAt, training } =
    req.user;
  const user = { _id, name, email, startTraining, finishTraining, createdAt, training };

  res.json({ user });
};

module.exports = currentUser;
