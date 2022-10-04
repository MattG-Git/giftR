const router = require('express').Router();
const { People, User, Gift } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    console.log('loading homepage')
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: People, 
        include: [
          { model: Gift,
            attributes: ['name', 'price', 'location'],
          },
        ],
       }],
    });

    const user = userData.get({ plain: true });
    console.log(user)
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

router.get('/addgift/:id', async (req, res) => { 
 try {
  const personsData= await People.findByPk(req.params.id, {
  }); 
  const people = personsData.get({ plain : true });
  res.render('addgift', {
    ...people,
  });
} catch (err)
{
  console.log(err)
  res.status(500).json(err);
}}); 
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
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
