const Gift = require('./Gift');
const People = require('./People');
const User = require('./User');

User.hasMany(People, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

People.belongsTo(User, {
  foreignKey: 'user_id'
});

People.hasOne(Gift, {
    foreignKey: 'people_id'
});

Gift.belongsTo(People,{
    foreignKey: 'people_id'
});

module.exports = { People,Gift,User};