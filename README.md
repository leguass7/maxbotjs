![standard-image](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)
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

# Getting Started

## Instalação
```yarn add maxbotjs``` ou ```npm install maxbotjs```

### Começando a usar

```javascript
import Maxbot from 'maxbotjs'

const maxbot = new Maxbot({ token: 'SEU_TOKEN_AQUI' })
```
ou

```javascript
import Maxbot from 'maxbotjs'

const maxbot = new Maxbot()
maxbot.setMe('token', 'SEU_TOKEN_AQUI')
```
## Contribuição
Métodos para serem implementados na classe ```Maxbot```
- [x] getStatus()
- [ ] getContact()
- [ ] getProt()
- [ ] putContact()
- [ ] setContact()
- [ ] sendText()
- [ ] sendImage()
- [ ] sendFile()
- [ ] sendSound()
