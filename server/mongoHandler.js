const bcrypt = require('bcrypt')
const {MongoClient, ObjectId} = require('mongodb')
const {v4} = require('uuid')

const client = new MongoClient('mongodb://localhost:27017')

const mongoHandler = {
  userTests: async (token) => {
    const users = await client.db('Forum').collection('Users')
    const isUserLogged = await users.findOne({token: token})
    if (isUserLogged !== null) {
      return {success: true, status: 200, text: 'Успешно'}
    }
    return {success: false, status: 403, text: 'Пользователь не авторизован'}
  },
  register: async (username, password, res) => {
    try {
      await client.connect()
      const collection = await client.db('Forum').collection('Users')
      const profile = await collection.findOne({username: username})
      if (profile && 'username' in profile && username === profile.username) {
        res.status(403).send('Пользователь с таким username уже существует')
      } else {
        let securePassword
        await bcrypt.hash(password, 5).then(function(hash) {
          securePassword = hash
        });
        await collection.insertOne({username: username, password: securePassword, _id: new ObjectId()}).then()
        res.status(201).send('Успешно')
      }
      await client.close()
    } catch (e) {
      res.status(500).send('Ошибка')
    }
  },
  login: async (username, password, res) => {
    try {
      await client.connect()
      const collection = await client.db('Forum').collection('Users')
      let token = v4()
      while (token === await collection.findOne({token: token})) {
        token = v4()
      }
      let profile = await collection.findOne({username: username})
      let isPasswordCorrect = false
      if (profile !== null) {
        await bcrypt.compare(password, profile.password).then(function (result) {
          isPasswordCorrect = result
        })
        if (isPasswordCorrect) {
          await collection.updateOne(
            {username: username, password: profile.password},
            {$set: {token: token}}).then(() => {
              res.status(201).send({token: token, id: profile._id})
            }
          )
        } else {
          res.status(418).send('Неправильный пароль пупсик')
        }
      } else {
        res.status(404).send('Пользователь не найден')
      }
      await client.close()
    } catch (e) {
      res.status(500).send('Ошибка')
    }
  },
  logout: async (token, res) => {
    try {
      await client.connect()
      const userInfo = await mongoHandler.userTests(token)
      if (userInfo.success) {
        const collection = await client.db('Forum').collection('Users')
        await collection.updateOne({token: token}, {$unset: {token: ''}})
      }
      res.status(userInfo.status).send(userInfo.text)
    } catch (e) {
      res.status(500).send('Ошибка')
    }
  },
  insertPost: async (title, description = null, image = null, token, res) => {
    try {
      await client.connect()
      const collections = await client.db('Forum').collection('Posts')
      if (!title) {
        res.status(400).send('Тема не должна быть пуста')
      } else if (!image && !description) {
        res.status(400).send('Одно из двух (Image или Description) не должно быть пустым')
      } else {
        const userInfo = await mongoHandler.userTests(token)
        if (userInfo.success) {
          await collections.insertOne({
            image: !image && description ? 'https://cdn-icons-png.flaticon.com/512/2639/2639965.png' : image,
            description: !description && image ? 'Без описания' : description,
            title: title,
            comments: [],
            _id: new ObjectId()
          })
        }
        res.status(userInfo.status).send(userInfo.text)
      }
    } catch (e) {
      res.status(500).send('Ошибка')
    }
  },
  insertComment: async (text, post, token, res) => {
    try {
      await client.connect()
      const collection = await client.db('Forum').collection('Comments')
      const userInfo = await mongoHandler.userTests(token)
      if (userInfo.success) {
        await collection.insertOne({text: text, post: post, _id: new ObjectId()})
      }
      res.status(userInfo.status).send(userInfo.text)
    } catch (e) {
      res.status(500).send('Ошибка')
    }
  },

}

module.exports = mongoHandler