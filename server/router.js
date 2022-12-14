const express = require('express')
const router = express.Router()
const mongoHandler = require('./mongoHandler')

router.post('/users', async (req, res) => {
  await mongoHandler.register(req.body.username, req.body.password, res)
})

router.post('/users/sessions', async (req, res) => {
  await mongoHandler.login(req.body.username, req.body.password, res)
})

router.patch('/users', async (req, res) => {
  await mongoHandler.logout(req.get('Id'), req.get('Token'), res)
})

router.post('/posts', async (req, res) => {
  await mongoHandler.insertPost(
    req.body.title,
    req.body.description ? req.body.description : null,
    req.body.image ? req.body.image : null,
    req.get('Id'),
    req.get('Token'),
    res
  )
})

router.post('/users/test', async (req, res) => {
  await mongoHandler.userIsExists(req.get('Id'), res)
})

router.post('/comments', async (req, res) => {
  await mongoHandler.insertComment(req.body.text, req.body.post, req.get('Id'), req.get('Token'), res)
})

router.get('/posts', async (_, res) => {
  await mongoHandler.findAll('Posts', res)
})

router.get('/comments', async (_, res) => {
  await mongoHandler.findAll('Comments', res)
})

module.exports = router