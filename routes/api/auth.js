const express = require("express");

const ctrl = require("../../controllers/auth");
const { validateBody, auth, upload } = require("../../middlewares");
const { ctrlWrapper } = require("../../utils");
const {
  authSchema,
  updateSubscriptionSchema,
  verifyEmailSchema,
} = require("../../models/user");

const router = express.Router();

router.post("/signup", validateBody(authSchema), ctrlWrapper(ctrl.signUp));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));
router.post(
  "/verify/:verificationToken",
  validateBody(verifyEmailSchema),
  ctrlWrapper(ctrl.resendEmail)
);
router.post("/login", validateBody(authSchema), ctrlWrapper(ctrl.signIn));
router.get("/logout", auth, ctrlWrapper(ctrl.signOut));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/subscription",
  auth,
  validateBody(updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
