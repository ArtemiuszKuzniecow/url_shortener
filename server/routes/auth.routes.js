const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).json({ message: "The user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: "User has been created" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try it later" });
  }
});
router.post("/login", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try it later" });
  }
});

module.exports = router;
