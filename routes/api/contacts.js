const express = require('express')
const router = express.Router()
const contacts = require('../../model')
const {
  validationAddContact,
  validationUpdateContact,
} = require('./validationContacts')

router.get('/', async (req, res, next) => {
  const data = await contacts.listContacts()
  try {
    return res.status(200).json({
      data,
      message: 'data loaded',
    })
  } catch (err) {
    return res.status(400).json({
      message: 'data is empty',
    })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const data = await contacts.getContactById(req.params.contactId)
    if (data) {
      return res.status(200).json({
        data,
        message: 'data loaded',
      })
    } else {
      return res.status(404).json({
        message: 'Not found',
      })
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', validationAddContact, async (req, res, next) => {
  try {
    const data = await contacts.addContact(req.body)
    return res.status(201).json({
      data,
      message: 'contact created',
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      message: 'missing required name field',
    })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const data = await contacts.removeContact(req.params.contactId)
    if (data) {
      return res.status(200).json({
        data,
        message: 'contact deleted',
      })
    } else {
      return res.status(404).json({
        message: 'Not found',
      })
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:contactId', validationUpdateContact, async (req, res, next) => {
  try {
    const data = await contacts.updateContact(req.params.contactId, req.body)
    if (data) {
      return res.status(200).json({
        data,
        message: 'contact update',
      })
    } else {
      return res.status(404).json({
        message: 'Not found',
      })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
