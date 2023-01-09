const router = require('express').Router();
const { Account } = require('../../models');

router.post('/', (req, res) => {
  console.log("/", req.body);

  // check for existing account with given name
  Account.findOne({
    where: {
      account_name: req.body.account_name
    }
  }).then(dbAccountData => {
    if (dbAccountData) {
      res.status(400).json({ message: 'Account already exists!' });
      return;
    }
  });

  // create account
  Account.create({
    account_name: req.body.account_name,
    password: req.body.password
  })
  .then(dbAccountData => {
    req.session.save(() => {
      req.session.accountId = dbAccountData.id;
      req.session.accountName = dbAccountData.accountName;
      req.session.loggedIn = true;
      
      res.json(dbAccountData);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/login', (req, res) => {
  console.log("/login", req.body);
  Account.findOne({
    where: {
      account_name: req.body.account_name
    }
  }).then(dbAccountData => {
    if (!dbAccountData) {
      res.status(400).json({ message: 'No account found!' });
      return;
    }

    const validPassword = dbAccountData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.accountId = dbAccountData.id;
      req.session.accountName = dbAccountData.accountName;
      req.session.loggedIn = true;

      res.json({ account: dbAccountData, message: 'You are now logged in!' });
    });
  });
});

// log out route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res
        .status(204)
        .json({ message: 'You are now logged out!' })
        .end();
    });
  } else {
    res.status(400).end();
  }
});

router.delete('/user/:id', (req, res) => {
  Account.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbAccountData => {
      if (!dbAccountData) {
        res.status(404).json({ message: 'No account found with this ID.' });
        return;
      }
      res.json(dbAccountData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
