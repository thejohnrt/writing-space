const Account = require('./Account');
const Post = require('./Post');

Post.belongsTo(Account, {
  foreignKey: 'accountId',
  onDelete: 'CASCADE'
});

module.exports = {
  Account,
  Post
};