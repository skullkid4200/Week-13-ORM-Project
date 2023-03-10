const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  })
.then(data => res.json(data))
.catch(err => res.status(500).json(err));
});

router.get('/:id', async (req, res) => {
  try {
    const searchData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [Product]
    });
    if (!searchData) {
      return res.status(404).json({
        "message": "unlisted ID." 
      });
    }
    return res.json(searchData);
  } catch(err) {
    return res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then(data => res.json(data))
  .catch(err => res.status(500).json(err));
  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
    const updateData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      include: [Product]
    });
    if (!updateData[0]) {
      return res.status(404).json({
        "message": "unlisted ID."
      });
    }
    return res.json(updateData);
  } catch(err) {
    return res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteData = await Category.destroy({
      where: {
        id: req.params.id
      },
      include: [Product]
    });
    if (!deleteData) {
      return res.status(404).json({
        "message": "unlisted ID."
      });
    }
    return res.json(deleteData);
  } catch(err) {
    return res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
