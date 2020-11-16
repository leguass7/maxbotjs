![standard-image](https://img.shields.io/badge/code%20style-standard-brightgreen.svg) [![NPM](https://img.shields.io/npm/v/maxbotjs.svg)](https://www.npmjs.com/package/maxbotjs)
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

## Contribuição
Contribuições serão bem vindas.

#### Métodos para serem implementados na classe ```Maxbot```
- [x] getStatus()
- [x] getContact()
- [ ] getProt()
- [x] putContact()
- [x] setContact()
- [ ] sendText()
- [ ] sendImage()
- [ ] sendFile()
- [ ] sendSound()

#### Documentação
- [ ] Documentos com melhor explicação que as encontradas no site oficial
- [ ] Documentação em inglês

***

## Observações importantes
 - Existe alguns incômodos e pequenos bugs nas respostas da API [veja aqui](./docs/issues-maxbot.md), que ***não possuem relação com essa biblioteca***, porém nada que afete o funcionamento dessa do ***maxbotjs***. vamos esperar pelas correções ;)

 - Embora os testes estejam devidamente escritos, não podemos executá-los, porque ainda não tivemos acesso a um *token de testes* por parte da ***maxbot.com.br***.
