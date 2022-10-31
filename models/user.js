const { Schema, model } = require("mongoose");
const joi = require("joi");
const { handleSaveErrors } = require("../utils/index");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);

const authSchema = joi.object({
  password: joi.string().min(6).required(),
  email: joi
    .string()
    .min(5)
    .pattern(emailRegexp)
    .email({ minDomainSegments: 2 })
    .required(),
  subscription: joi.string().min(3).valid("starter", "pro", "business"),
});

const updateSubscriptionSchema = joi.object({
  subscription: joi
    .string()
    .min(3)
    .valid("starter", "pro", "business")
    .required(),
});

userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);

module.exports = {
  User,
  authSchema,
  updateSubscriptionSchema,
};
