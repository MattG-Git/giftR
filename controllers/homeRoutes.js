const router = require('express').Router();
const { People, User, Gift } = require('../models');
const withAuth = require('../utils/auth');

 router.get('/', withAuth, async (req, res) => {
      try {
        const peopleData = await People.findAll({
          include: [
            {
              model: User,
              attributes: ['name'],
          },
        ],
      });

  const people = peopleData.map((p) => p.get({ plain: true }));

      res.render('main', { 
              people, 
              logged_in: req.session.logged_in 
          });
        } catch (err) {
            res.status(500).json(err);
        }
 });

// router.get('/', (req, res) => {
//   res.render('main')
// });
  


router.get('/all', withAuth, async (req, res) => {
  try {

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: People }, 
       // {model: Gift}
      ],
    });

    //const giftData = await 

    const user = userData.get({ plain: true });

    res.render('all', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err); 
    res.status(500).json(err);
  }
});

router.get('/people/:id', async (req, res) => {
  try {
    const peopleData = await People.findByPk(req.params.id, {
      include: [
        {
          model: People,
          attributes: ['name', 'budget'],
        },
        {
            model: Gift,
            attributes: ['name', 'actual_price'],
        }
      ],
    });

    const people = peopleData.get({ plain: true });

    res.render('people', {
      ...people,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/addperson', (req, res) => { 
  res.render('addperson');
}); 

router.get('/editperson/:id', withAuth, async (req, res) => {
  try {
    const peopleData = await People.findByPk(req.params.id, {
      include: [
        {
          model: Gift,
      },
    ],
    });

    const person = peopleData.get({ plain: true });

    res.render('editperson', {
      ...person,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/all');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/all');
    return;
  }
  res.render('login');
});

module.exports = router;
