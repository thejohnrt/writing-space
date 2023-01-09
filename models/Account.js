const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');

// create our Account model
class Account extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    account_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newAccountData) {
        newAccountData.password = await bcrypt.hash(newAccountData.password, 10);
        return newAccountData;
      },

      async beforeUpdate(updatedAccountData) {
        updatedAccountData.password = await bcrypt.hash(updatedAccountData.password, 10);
        return updatedAccountData;
      }
    },
    sequelize,
    underscored: true,
    modelName: 'Account'
  }
);

module.exports = Account;
