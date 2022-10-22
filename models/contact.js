const { Schema, model } = require("mongoose");
const joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().min(5).email({ minDomainSegments: 2 }),
  phone: joi.string().min(3),
  favorite: joi.boolean(),
});

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean().required(),
});

contactSchema.post("save", (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, addSchema, updateFavoriteSchema };
