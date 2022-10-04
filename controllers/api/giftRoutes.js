const router = require('express').Router();
const { Gift } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  try {
    const gifts = await Gift.findAll({
    });

    res.render('all', {
      gifts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const giftData = await Gift.findByPk(req.params.id, {
      include: [
        {
          attributes: [
            'user_id', 
            'name',
            'price',
            'location'
          ],
        }
      ]
    })
    const gift = giftData.get({ plain: true });
    res.render('homepage', {
      gift,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
  try {
    const newGift = await Gift.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newGift);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});


router.put('/:id', withAuth, async (req, res) => {
  try {
    const giftData = await Gift.update (
      {
        name: req.body.name,
        price: req.body.price
      },
      {
        where: {
          id: req.params.id,
        }
      }
    )
    if (!giftData) {
      res.status(404).json({ message: 'No gift found with this id!' });
      return;
    }
    res.status(200).json(giftData);
  }  catch (err) {
    res.status(500).json(err);
  }
})


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const giftData = await Gift.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!giftData) {
      res.status(404).json({ message: 'No gift found with this id!' });
      return;
    }

    res.status(200).json(giftData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
