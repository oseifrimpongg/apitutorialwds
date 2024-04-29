const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

// Getting All
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

// Creating one
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    age: req.body.age,
    subscribedToChannel: req.body.subscribedToChannel,
  });

  try {
    const addedSubscriber = await subscriber.save();
    res.status(201).json(addedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one
router.patch("/:id", getSubscriber, (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }

  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }

  try {
    let updatedSub = res.subscriber.save();
    res.json(updatedSub);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Deleting one
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await Subscriber.deleteOne(res.subscriber);
    res.json({ message: "Noble God, the impudent user has been removed!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

async function getSubscriber(req, res, next) {
  try {
    let subscriber = await Subscriber.findById(req.params.id);
    if (subscriber) {
      console.log("Subscriber found, please proceed you coding god!");
      res.subscriber = subscriber;
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
  next();
}
