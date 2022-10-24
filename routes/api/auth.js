const express = require("express");

const ctrl = require("../../controllers/auth");
const { validateBody, auth } = require("../../middlewares");
const { ctrlWrapper } = require("../../utils");
const { authSchema, updateSubscriptionSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validateBody(authSchema), ctrlWrapper(ctrl.signUp));
router.post("/login", validateBody(authSchema), ctrlWrapper(ctrl.signIn));
router.get("/logout", auth, ctrlWrapper(ctrl.signOut));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  auth,
  validateBody(updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
