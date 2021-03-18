<p align="center"><img src="/.github/maxbotjs.svg" height="120" width="90" alt="maxbotjs" /></p>

![standard-image](https://img.shields.io/badge/code%20style-standard-brightgreen.svg) [![NPM](https://img.shields.io/npm/v/maxbotjs.svg)](https://www.npmjs.com/package/maxbotjs) [![Coverage Status](https://coveralls.io/repos/github/leguass7/maxbotjs/badge.svg?branch=master)](https://coveralls.io/github/leguass7/maxbotjs?branch=master) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# maxbotjs
 > Biblioteca (não oficial) **nodejs** de integração com [MAXBOT](https://maxbot.com.br)
 Por favor, visite o site oficial para entender como funciona.

### O que é MAXBOT?
É uma empresa que trabalha com uma ferramenta completa de atendimento automatizado via WhatsApp.

### Documentação de referência
- [Site oficial](https://maxbot.com.br)
- [Docs API](https://mbr.maxbot.com.br/doc-api-v1.php)
- [Termos de uso](https://mbr.maxbot.com.br/termos-de-uso.php)

### Pré requisitos
Antes de começar você precisará se cadastrar na *plataforma oficial* e obter um **token** de acesso.

# Começando a usar

## Instalação
```bash
yarn add maxbotjs
```
ou
```bash
npm install maxbotjs
```

### Instância
```js
// index.js
import Maxbot from 'maxbotjs'

// create and config instance
const maxbot = new Maxbot({
  token: 'SEU_TOKEN_AQUI',
  timeout: 1000, // optional: default 3000 (3 seconds)
})
```
ou

```js
// index.js
import Maxbot from 'maxbotjs'

// instance
const maxbot = new Maxbot()

// config method
maxbot.setMe('token', 'SEU_TOKEN_AQUI')
```

### Teste
```js
// example
maxbot.getStatus().then(result => {
  console.log(result)
})

// or

const result = await maxbot.getStatus()
console.log(result)
```

***

#### Métodos para serem implementados na classe ```Maxbot```
- [x] [getStatus()](#getstatus)
- [x] [getSegmentation()](#getsegmentation)
- [x] [getTemplate()](#gettemplate)
- [x] [getServiceSector()](#getservicesector)
- [x] [getAttendant()](#getattendant)
- [x] [getContact()](#getcontact)
- [ ] [getProt()](#getprot)
- [x] [putContact()](#putcontact)
- [x] [setContact()](#setcontact)
- [ ] [openFollowup()](#openfollowup)
- [x] [sendText()](#sendtext)
- [x] [sendImage()](#sendimage)
- [x] [sendFile()](#sendfile)
- [x] [sendSound()](#sendsound)

### Documentação

#### getStatus
Retorna situação da API
```js
const result = await maxbot.getStatus()

// out
{
  status: 1, // Situação do processamento: 1-Sucesso, 0-Falha
  msg: "Success", // Mensagem de contexto do processamento.
  data: [
    {
      createdAt: "2020-08-22", //  Data de criação
      status: "Active", // Situação da API
      lastExecutionAt: "2020-08-29 21:21:32", // Data da última execução
      lastOperation: "Sound Shooting" // Última operação executada pela API
    }
  ]
}
```

#### getSegmentation
Retorna lista de segmentações incluídas na plataforma
```js
const result = await maxbot.getSegmentation()

// out
{
  status: 1,
  msg: "Success",
  segmentation: [
    {
      id: 1452, // ID da segmentação
      title: "Negocia\u00e7\u00e3o" // Título da segmentação
    },
    {
      id: 2267,
      title: "Proposta Enviada"
    }
    // ...
  ]
}
```

#### getTemplate
 Retorna lista de templates cadastrados na conta Maxbot.
```js
const result = await maxbot.getTemplate()

// out
{
  status: 1,
  msg: "Success",
  template: [
    {
      id: 1,
      type: "chat",
      title: "Negocia\u00e7\u00e3o",
      forUse: 0
    },
    {
      id: 2,
      type: "followup",
      title: "Abertura de Protocolo",
      forUse: 1
    },
    {
      id: 3,
      type: "notice",
      title: "Aviso de Postado nos Correios",
      forUse: 1
    }
    // ...
  ]
}

```

#### getServiceSector
Retorna lista dos setores de atendimento cadastrados.

**Obs.:** *Se o atendimento para o dia da semana estiver configurado para 24 horas, os horários dos turnos serão ignorados.*
```js
const result = await maxbot.getServiceSector()

// out
{
  status: 1,
  msg: "Success",
  serviceSector: [
    {
      id: 1, // ID do setor
      code: "CO", // Código do setor
      name: "Comercial", // Nome do setor
      responsibleName: "Rodrigo Gomide", //  Nome do responsável pelo setor
      responsibleEmail: "rodrigo@email.com", //  e-mail do responsável pelo setor
      responsibleWhatsapp: "553111116666", // Número do whatsapp do responsável pelo setor
      responsibleMobilePhone: "553111116666", // Número do celular do responsável pelo setor
      responsiblePhoneExtension: "5454", // Número do ramal do responsável pelo setor
      operationMondayAnswer: 1, //  Se há atendimento nas segundas-feiras (0 - Não, 1 - Sim, Em Horários Determinados, 2 - Sim, 24 horas)
      operationMondayShift1: "08:00-12:00", // Horário do 1º turno (Hora:Minuto-Hora:Minuto)
      operationMondayShift2: "13:00-18:00", // Horário do 2º turno (Hora:Minuto-Hora:Minuto)
      operationTuesdayAnswer: 1, // Se há atendimento nas terças-feiras (0 - Não, 1 - Sim, Em Horários Determinados, 2 - Sim, 24 horas)
      operationTuesdayShift1: "08:00-12:00",
      operationTuesdayShift2: "13:00-18:00",
      operationWednesdayAnswer: 1,
      operationWednesdayShift1: "08:00-12:00",
      operationWednesdayShift2: "13:00-18:00",
      operationThursdayAnswer: 1,
      operationThursdayShift1: "08:00-12:00",
      operationThursdayShift2: "13:00-18:00",
      operationFridayAnswer: 1,
      operationFridayShift1: "08:00-12:00",
      operationFridayShift2: "13:00-18:00",
      operationSaturdayAnswer: 1,
      operationSaturdayShift1: "08:00-12:00",
      operationSaturdayShift2: "13:00-18:00",
      operationSundayAnswer: 1,
      operationSundayShift1: "08:00-12:00",
      operationSundayShift2: "13:00-18:00",
      allowServiceWithUnavailableAttendants: 0, // Se permite atendimento quando não houver nenhum atendente on-line (0 - Não, 1 - Sim)
    },
    { ... }
    // ...
}
```

#### getAttendant
```js
const result = await maxbot.getAttendant()

// out
{
  status: 1,
  msg: "Success",
  attendant: [
    {
      id: 1, // ID do atendente
      serviceSectorId: [1], // Lista de IDs dos setores de atendimento aos quais o atendente está associado
      name: "Pedro Silva", // Nome do atendente
      status: 1 // Situação do atendente (0 - Inativo, 1 - Ativo)
    },
    {
      id: 2,
      serviceSectorId: [2, 3],
      name: "Jos\u00e9 Nogueira",
      status: 0
    },
    {
      id: 3,
      serviceSectorId: [1, 3, 8, 29],
      name: "Ant\u00f4nio Prado",
      status: 1
    }
  ]
}


```

#### getContact
Retorna lista de contatos cadastrados no maxbot.

 - **Obs. 1:** *Você pode informar a mesma data de início e fim para trazer os contatos do dia, ou informar uma data de início e outra data diferente para o fim para trazer os contatos dentro de um período;*
 - **Obs. 2:** *Se você informar ```whatsapp``` ou ```mobilePhone``` ou ```email``` ou ```externalId```, o informe do período ```dateStart``` e ```dateStop``` fica opicional. Ou seja, você pode fazer uma consulta apenas informando o *whatsapp*, ou o *email* por exemplo. O Maxbot irá localizar o registro com base nos parâmetros informados.;*

```js
const result = await maxbot.getContact({
  dateStart: "2020-06-01",
  dateStop: "2020-06-18",
})

// out
{
  status: 1,
  msg: 'Success',
  data: [
    {
      id: '1',
      cadDate: '2020-06-08 08:07:16',
      segmentation: [],
      tag: 'THER',
      name: 'Rodrigo',
      surname: 'Funda\u00e7\u00e3o Ther',
      gender: 'M',
      birth: '1974-10-22',
      age: '46',
      brPersonType: 'J',
      brCpf: '11122233344',
      brCnpj: '11222333000144',
      company: 'Ther Sistemas Ltda',
      email: 'rodrigo@maxbot.com.br',
      whatsapp: '5531911112222',
      mobilePhone: '5531922223333',
      phone: '3132324455',
      country: 'BR',
      state: 'MG',
      city: 'Vi\u00e7osa',
      profession: '',
      externalId: '5678',
      avatarUrl: '',
      obs: '',
      inAttendance: '0',
      currentProtocol: '',
      currentAttendant: ''
    },
    {
      id: '2',
      cadDate: '2020-06-18 19:10:42',
      segmentation: [],
      tag: '',
      name: 'Dilson',
      surname: 'Lana',
      gender: 'M',
      birth: '',
      age: '',
      brPersonType: 'F',
      brCpf: '',
      brCnpj: '',
      company: '',
      email: '',
      whatsapp: '5531911112222',
      mobilePhone: '5531922223333',
      phone: '',
      country: 'BR',
      state: 'SP',
      city: 'Campinas',
      profession: '',
      externalId: '',
      avatarUrl: '',
      obs: 'Cliente VIP',
      inAttendance: '1',
      currentProtocol: '2345',
      currentAttendant: 'Keli Marchi'
    },
    // ...
  ]
}
```

#### getProt
```js

```

#### putContact
```js
const result = await maxbot.putContact({
  segmentation: ['Negocia\u00e7\u00e3o', 'Proposta Enviada'],
  tag: 'VIP',
  name: 'Jose',
  surname: 'Silva',
  gender: 'M',
  birth: '1974-06-15',
  brPersonType: 'J',
  brCpf: '11122233300',
  brCnpj: '00111222000133',
  company: 'Empresa Minha Ltda',
  email: 'jose@email.com',
  whatsapp: '5531911116666',
  mobilePhone: '5531911116666',
  phone: '553155551122',
  country: 'BR',
  state: 'MG',
  city: 'Belo Horizonte',
  profession: 'ESPORTE',
  externalId: '667811',
  avatarUrl: 'https://www.meusite.com.br/foto.jpg',
  obs: 'Enviar proposta comercial na segunda'
})

// out
{
  status: 1,
  msg: 'Success',
  contact_id: 1234
}
```

#### setContact
```js
const result = await maxbot.setContact({
  forContactId: '1234',
  segmentation: ['Negocia\u00e7\u00e3o', 'Proposta Enviada'],
  tag: 'VIP',
  name: 'Jose',
  surname: 'Silva',
  gender: 'M',
  birth: '1974-06-15',
  brPersonType: 'J',
  brCpf: '11122233300',
  brCnpj: '00111222000133',
  company: 'Empresa Minha Ltda',
  email: 'jose@email.com',
  whatsapp: '5531911116666',
  mobilePhone: '5531911116666',
  phone: '553155551122',
  country: 'BR',
  state: 'MG',
  city: 'Belo Horizonte',
  profession: 'ESPORTE',
  externalId: '667811',
  avatarUrl: 'https://www.meusite.com.br/foto.jpg',
  obs: 'Enviar proposta comercial na segunda'
})

// out

{
  status: 1,
  msg: 'Success'
}
```

#### openFollowup
```js

```

#### sendText
```js
const result = await maxbot.sendText({ whatsapp: '553191112222'}, 'Mensagem')

// out
{
 status: 1,
 msg: 'Success'
}

```

#### sendImage
```js
// allowed images ['jpg', 'jpeg', 'png', 'gif']
const urlImage = 'https://example.com/image.png'
const result = await maxbot.sendImage({ whatsapp: '553191112222' }, urlImage)

// out
{
 status: 1,
 msg: 'Success'
}

```

#### sendFile
```js
// allowed files ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pps']
const urlFile = 'https://example.com/file.pdf'
const result = await maxbot.sendFile({ whatsapp: '553191112222' }, urlFile)

// out
{
 status: 1,
 msg: 'Success'
}
```

#### sendSound
```js
// allowed sounds ['mp3']
const urlSound = 'https://example.com/sound.mp3'
const result = await maxbot.sendFile({ whatsapp: '553191112222' }, urlSound)

// out
{
 status: 1,
 msg: 'Success'
}

```

***

## Contribuição
Qualquer contribuição será bem vinda.

## Observações importantes
 - Embora os testes estejam devidamente escritos, você não poderá executá-los sem um token de acesso. Ainda não obtivemos acesso a um *token de testes* por parte da ***maxbot.com.br***.
