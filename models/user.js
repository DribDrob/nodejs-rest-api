const { Schema, model } = require("mongoose");
const joi = require("joi");
const { handleSaveErrors } = require("../utils/index");

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
    // owner: {
    //   type: SchemaTypes.ObjectId,
    //   ref: "user",
    // },
  },
  { versionKey: false, timestamps: true }
);

const authSchema = joi.object({
  password: joi.string().min(6).required(),
  email: joi.string().min(5).email({ minDomainSegments: 2 }).required(),
  subscription: joi.string().min(3).valid("starter", "pro", "business"),
  token: joi.string(),
});

userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);

module.exports = { User, authSchema };
