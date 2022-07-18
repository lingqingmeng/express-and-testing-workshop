const express = require('express');
const router = express.Router();
const queries = require('./../queries');

router.get('/fastcars', (req, res, next) =>
  res.json({
    fastcars: ["tesla","ford","gm"]
  })
);

router.get('/facsters', (req, res, next) =>
  queries
    .getAll()
    .then(users => res.status(200).json(users))
    .catch(err => next(err))
);

router.get('/facsters/:name', ({ params: { name } }, res, next) => {
  queries
    .getSingleFacster(name)
    .then(person => res.status(200).json(person))
    .catch(err => next(err));
});

router.post('/facster/new', ({ body }, res, next) => {
  queries
    .addFacster(body)
    .then(userID => queries.getFacsterById(userID))
    .then(user => res.status(201).json(user))
    .catch(err => next(err));
});

router.get('/facsters/:name/hobby', ({ params: { name }, body }, res, next) => {
  queries
    .getFacsterHobby(name)
    .then(facsterAndHobby => res.status(200).json(facsterAndHobby))
    .catch(err => next(err));
});

router.get(
  '/facsters/:name/superpower',
  ({ params: { name }, body }, res, next) => {
    queries
      .getFacsterSuperpower(name)
      .then(facsterAndPower => res.status(200).json(facsterAndPower))
      .catch(err => next(err));
  }
);

module.exports = router;
