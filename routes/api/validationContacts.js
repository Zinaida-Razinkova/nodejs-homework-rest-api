<<<<<<< Updated upstream
const Joi = require('joi')
=======
const Joi = require("joi");
const mongoose = require("mongoose");
>>>>>>> Stashed changes

const schemaAddContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  phone: Joi.string().min(7).max(18).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
<<<<<<< Updated upstream
})
=======
  favorite: Joi.boolean(),
});
>>>>>>> Stashed changes
const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),

  phone: Joi.string().min(7).max(18).optional(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional(),
<<<<<<< Updated upstream
})
=======
  favorite: Joi.boolean().optional(),
}).min(1);

const schemaUpdateContactFav = Joi.object({
  favorite: Joi.boolean().required(),
});
>>>>>>> Stashed changes

const validation = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    console.log(err)
    next({
      status: 400,
      message: err.message,
    })
  }
}

module.exports = {
  validationAddContact: async (req, res, next) => {
    return await validation(schemaAddContact, req.body, next)
  },
  validationUpdateContact: async (req, res, next) => {
    return await validation(schemaUpdateContact, req.body, next)
  },
<<<<<<< Updated upstream
}
=======
  validateUpdateContactFav: async (req, res, next) => {
    if (!req.body.favorite)
      return res.status(400).json({ message: "missing field favorite" });
    return await validation(schemaUpdateContactFav, req.body, next);
  },
  validationObjectId: async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return next({
        status: 400,
        message: "Invalid ObjectId",
      });
    }
    next();
  },
};
>>>>>>> Stashed changes
