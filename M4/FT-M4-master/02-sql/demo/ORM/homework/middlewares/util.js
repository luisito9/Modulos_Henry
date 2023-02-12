function validatePost(body) {
  if (!body.code || !body.name || !body.hp || !body.mana) return true;
  else return false;
}

module.exports = {
  validatePost,
};
