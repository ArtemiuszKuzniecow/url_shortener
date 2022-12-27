const { Router } = require("express");
const { findById } = require("../models/Link");
const shortid = require("shortid");
const config = require("config");
const Link = require("../models/Link");
const router = Router();
const auth = require("../middleware/auth.middleware");

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;
    const code = shortid.generate();
    const existing = await Link.findOne(from);

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + "/t/" + code;

    const link = new Link({
      code,
      to,
      from: req.user.userId,
    });

    await link.save();
    res.status(201).json({ link });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try it later" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try it later" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const links = findById(req.params.id);
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try it later" });
  }
});

module.exports = router;
