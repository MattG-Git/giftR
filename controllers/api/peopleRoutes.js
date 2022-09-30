const router = require('express').Router();
const { People } = require('../../models');
const withAuth = require('../../utils/auth');

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
