const sequelize = require('../config/connection');
const { User, People, Gift } = require('../models');

const userData = require('./userData.json');
const peopleData = require('./peopleData.json');
const giftData = require('./giftData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = []

  for (const user of userData) {
    let _user = await User.create(user, {
      individualHooks: true
    });

    users.push(_user)
  }

  const persons = []

  for (const people of peopleData) {
    let person = await People.create({
      ...people,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });

    persons.push(person)
  }

  for (const gift of giftData) {
    await Gift.create({
      ...gift,
      people_id: persons[Math.floor(Math.random() * persons.length)].id,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();