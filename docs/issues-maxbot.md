# Problemas encontrados na API Oficial
em ***11/11/2020***

Problemas encontrados nas solicitações em URL da API V1: https://mbr.maxbot.com.br/api/v1.php
***
## get_contact
Ao realizar uma busca por campos *whatsapp*, *mobile_phone* e *email* simultaneamente: se o email do contact cadastrado no maxbot estiver vazio o resultado é um array vazio, mesmo que o *whatsapp* e *mobile_phone* estejam devidamente cadastrados.

### Para reproduzir
Sabendo que o contato foi previamente cadastrado, com whatsapp = 5511999998888", e email= '' *(vazio)*

```json
{
         "token": "xxxx",
           "cmd": "get_contact",
      "whatsapp": "5511999998888",
         "email": "fulano@mail.com",
}
```
### Comportamento esperado
A api deveria fazer uma busca utilizando pelo ao menos os 3 campos (whatsapp,mobile_phone, email) como anunciado na documentação, claro, priorizando o ***whatsapp***, independente das outras informações.

***
## set_contact
- Toda requisição para ***set_contact*** ou ***put_contact*** embora obtenhamos ***http status 200*** e uma resposta JSON como esperado:
```json
{"status":1,"msg":"Success"}
```
Podemos observar o erro do PHP abaixo:
> Warning: explode() expects parameter 2 to be string, array given in /home maxbotcom/public_html/mbr/api/v1/set_contact.php on line 499
Warning: Invalid argument supplied for foreach() in /home/maxbotcom/public_html/mbr/api/v1/set_contact.php on line 502

- No campo ***segmentation***, há uma divergência na documentação oficial, onde no exemplo JSON é um ***array***, mas no texto explicativo diz que deve ser uma ***string*** com as segmentações separadas com vírgula "(ex.: prospecto,apresentação,orçamento)"
### Comportamento esperado
Apenas uma resposta à requisição sem erros
