const express = require("express");

const ctrl = require("../../controllers/auth");
const { validateBody } = require("../../middlewares");
const { ctrlWrapper } = require("../../utils");
const { authSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validateBody(authSchema), ctrlWrapper(ctrl.signUp));
router.post("/login", validateBody(authSchema), ctrlWrapper(ctrl.signIn));

module.exports = router;
