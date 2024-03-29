import Maxbot from '../src'

const env = {
  token: process.env.MAXBOT_TOKEN,
  whatsappTest: process.env.TEST_WHATSAPP,
  imageTest: process.env.TEST_IMAGE_URL,
  fileTest: process.env.TEST_FILE_URL,
  soundTest: process.env.TEST_SOUND_URL
}

const maxbot = new Maxbot({ token: env.token })
let contactTest = {}

describe('Test Class', () => {
  describe('Should configure the class', () => {
    test('Should a class', () => {
      const mb = new Maxbot()
      expect(mb).toBeInstanceOf(Maxbot)
    })

    test('Should return http errors', async () => {
      const mb = new Maxbot({ baseURL: 'http://invalidurl', timeout: 2000 })
      let response = await mb.getStatus()
      expect(response).toEqual(expect.objectContaining({ status: 0, msg: 'Timeout' }))
      mb.setMe('baseURL', 'https://avatarsolucoesdigitais.com.br/testinvalidurl/test.html')
      response = await mb.getStatus()
      expect(response).toEqual(expect.objectContaining({ status: 0 }))
    })

    test('Should test checks extension', () => {
      expect(maxbot.isValidExt('.pdf')).toEqual(true)
      expect(maxbot.isValidExt('.pdf', 'image')).toEqual(false)
      expect(maxbot.isValidExt('exe', 'file')).toEqual(false)
      expect(maxbot.isValidExt('ppt', 'file')).toEqual(true)
    })

    test('Should contain a default timeout', () => {
      expect(maxbot.getMe()).toEqual(expect.objectContaining({ timeout: 3000 }))
    })

    test('Should configure an object', () => {
      maxbot.setMe({ timeout: 3500, token: env.token })
      expect(maxbot.getMe()).toEqual(expect.objectContaining({ timeout: 3500, token: env.token }))
    })

    test('Should set up a property', () => {
      maxbot.setMe('timeout', 3600)
      expect(maxbot.getMe()).toEqual(expect.objectContaining({ timeout: 3600, token: env.token }))
    })

    test('Should set up a property using a function', () => {
      maxbot.setMe('timeout', () => 5000 + 1)
      expect(maxbot.getMe()).toEqual(expect.objectContaining({ timeout: 5001, token: env.token }))
    })

    test('Should not set up an invalid property', () => {
      maxbot.setMe('invalidProp', true)
      expect(maxbot.getMe()).toEqual(expect.not.objectContaining({ invalidProp: true }))
      maxbot.setMe({ invalidKey: true })
      expect(maxbot.getMe()).toEqual(expect.not.objectContaining({ invalidKey: true }))
    })
  })

  describe('Test of Api requests', () => {
    const apiExpectedSuccess = { status: 1, msg: 'Success' }
    const filterContact = { whatsapp: env.whatsappTest }

    test('Should get_status', async () => {
      const response = await maxbot.getStatus()
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess))
    })

    test('Should get_segmentation', async () => {
      const response = await maxbot.getSegmentation()
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess))
    })

    test('Should get_service_sector', async () => {
      const response = await maxbot.getServiceSector()
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess))
      expect(response).toHaveProperty('serviceSector')
    })

    test('Should get_template', async () => {
      const response = await maxbot.getTemplate()
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess))
      expect(response).toHaveProperty('template')
    })

    test('Should get_attendant', async () => {
      const response = await maxbot.getAttendant()
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess))
      expect(response).toHaveProperty('attendant')
    })

    test('Should get_contact', async () => {
      const response = await maxbot.getContact(filterContact)
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess))
      expect(response).toHaveProperty('data')
      contactTest = { ...response.data[0] }
    })

    test('Should set_contact', async () => {
      const response = await maxbot.setContact({
        forContactId: contactTest.id,
        country: 'BR',
        obs: 'Testing'
      })
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess))
    })

    test('Should send_text', async () => {
      const response = await maxbot.sendText(
        filterContact,
        'Hello Word: Teste de mensagem pelo maxbot'
      )
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess))
    })

    test('Should send_image', async () => {
      const response = await maxbot.sendImage(filterContact, env.imageTest)
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess))
    })

    test('Should send_file', async () => {
      const response = await maxbot.sendFile(filterContact, env.fileTest)
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess))
    })

    test('Should send_sound', async () => {
      const response = await maxbot.sendSound(filterContact, env.soundTest)
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess))
    })

    // test('Should create a contact', async () => {
    //   const expected = { status: 1, msg: 'Success' }
    //   const response = await maxbot.pu
    //   expect(response).toEqual(expect.objectContaining(expected))
    // })
  })
})
