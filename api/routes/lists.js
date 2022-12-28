const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

// CREATE
router.post("/", verify, async (req, res) => {
  if (req.User.isAdmin) {
    const newList = new List(req.body);

    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (error) {
      res.status(error).json(error);
    }
  } else {
    res.status(401).json("You are not allowed");
  }
});

// DELETE
router.delete("/", verify, async (req, res) => {
  if (req.User.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been deleted");
    } catch (error) {
      res.status(error).json(error);
    }
  } else {
    res.status(401).json("You are not allowed");
  }
});

// GET LISTS
router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.typeQuery;
  const genreQuery = req.query.typeQuery;
  let list = [];

  try {
    if (type) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
