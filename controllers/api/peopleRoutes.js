const router = require('express').Router();
const { response } = require('express');
const { People, Gift } = require('../../models');
const withAuth = require('../../utils/auth');
const createCsvWriter = require("csv-writer").createObjectCsvStringifier;

router.post('/', withAuth, async (req, res) => {
  try {
    const newPerson = await People.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPerson);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/export', withAuth, async (req, res) => {
  try {
    //const createCsvWriter = require('csv-writer').createObjectCsvWriter;


const csvWriter = createCsvWriter({
  header: [
    { id: "name", title: "USERNAME" },
    { id: "budget", title: "BUDGET" },
    { id: "gift_name", title: "GIFT_NAME" },
    { id: "gift_price", title: "GIFT_PRICE" },
    { id: "gift_location", title: "GIFT_LOCATION" },
  ],
});

const peopleData = await People.findAll({
  where: {
    user_id: req.session.user_id
  },
  include: [
    {
        model: Gift,
        attributes: ['name', 'price', 'location'],
    }
  ],
})
const people = peopleData.map( p => p.get({plain: true}))

const exportArray = []
for (const person of people) {
  for (const gift of person.gifts) {
    exportArray.push({
      name: person.name,
      budget: person.budget,
      gift_name: gift.name,
      gift_price: gift.price,
      gift_location: gift.location
    })
  }
}

const writer = csvWriter.getHeaderString() + csvWriter.stringifyRecords(exportArray) // returns a promise
console.log(writer)
res.set('Content-Type', 'application/octet-stream');
res.attachment('Giftr_list.csv')
 res.send(writer);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
})

router.put('/:id', withAuth, async (req, res) => {
  try {
    const peopleData = await People.update (
      {
        name: req.body.name,
        budget: req.body.budget,
      },
      {
        where: {
          id: req.params.id,
        }
      }
    )
    if (!peopleData) {
      res.status(404).json({ message: 'No person found with this id!' });
      return;
    }
    res.status(200).json(peopleData);
  }  catch (err) {
    res.status(500).json(err);
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const peopleData = await People.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!peopleData) {
      res.status(404).json({ message: 'No person found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
