import dotenv from 'dotenv'
import Maxbot from '../index'

dotenv.config()

const token = process.env.MAXBOT_TOKEN
const whatsappTest = process.env.TEST_WHATSAPP
// const imageTest = process.env.TEST_IMAGE_URL

const maxbot = new Maxbot({ token })

describe('Test Class', () => {
  // ...
  describe('Should configure the class', () => {
    test('Should a class', () => {
      const mb = new Maxbot()
      expect(mb).toBeInstanceOf(Maxbot)
    })

    test('Should return http errors', async () => {
      const mb = new Maxbot({ baseURL: 'http://invalidurl', timeout: 500 })

      expect(await mb.getStatus()).toEqual(expect.objectContaining({ status: 0, msg: 'Timeout' }))

      mb.setMe('baseURL', 'http://google.com.br/testinvalidurl')
      expect(await mb.getStatus()).toEqual(
        expect.objectContaining({ status: 0, msg: 'httpError 404' })
      )
    })

    test('Should contain a default timeout', () => {
      expect(maxbot.getMe()).toEqual(expect.objectContaining({ timeout: 3000 }))
    })

    test('Should configure an object', () => {
      maxbot.setMe({ timeout: 3500, token })
      expect(maxbot.getMe()).toEqual(expect.objectContaining({ timeout: 3500, token }))
    })

    test('Should set up a property', () => {
      maxbot.setMe('timeout', 3600)
      expect(maxbot.getMe()).toEqual(expect.objectContaining({ timeout: 3600, token }))
    })

    test('Should set up a property using a function', () => {
      maxbot.setMe('timeout', () => 5000 + 1)
      expect(maxbot.getMe()).toEqual(expect.objectContaining({ timeout: 5001, token }))
    })

    test('Should not set up an invalid property', () => {
      maxbot.setMe('invalidProp', true)
      expect(maxbot.getMe()).toEqual(expect.not.objectContaining({ invalidProp: true }))
      maxbot.setMe({ invalidKey: true })
      expect(maxbot.getMe()).toEqual(expect.not.objectContaining({ invalidKey: true }))
    })
  })

  describe('Test of Api requests', () => {
    test('Should get_status', async () => {
      const expected = { status: 1, msg: 'Success' }
      const response = await maxbot.getStatus()
      // console.log('response get_status', response)
      expect(response).toEqual(expect.objectContaining(expected))
    })

    test('Should get_segmentation', async () => {
      const expected = { status: 1, msg: 'Success' }
      const response = await maxbot.getSegmentation()
      // console.log('response get_segmentation', response)
      expect(response).toEqual(expect.objectContaining(expected))
    })

    test('Should send_text', async () => {
      const expected = { status: 1, msg: 'Success' }
      const response = await maxbot.sendText({ whatsapp: whatsappTest }, 'Hello Word')
      expect(response).toEqual(expect.objectContaining(expected))
    })

    // test('Should send_image', async () => {
    //   const expected = { status: 1, msg: 'Success' }
    //   const response = await maxbot.sendImage({ whatsapp: whatsappTest }, imageTest)
    //   expect(response).toEqual(expect.objectContaining(expected))
    // })

    // test('Should create a contact', async () => {
    //   const expected = { status: 1, msg: 'Success' }
    //   const response = await maxbot.pu
    //   expect(response).toEqual(expect.objectContaining(expected))
    // })
  })
})
