# Vercel Email Sender

Este projeto contém duas rotas para usar na Vercel como serverless functions.

## Rotas

- `/api/hello` - Retorna Hello World
- `/api/enviar-email?email=EMAIL&frase=MENSAGEM` - Envia e-mail usando Nodemailer

## Como usar

1. Crie um projeto na Vercel e envie este código.
2. Configure as variáveis de ambiente `EMAIL_USER` e `EMAIL_PASS` na Vercel.
3. Faça deploy e acesse a URL gerada.

Exemplo:

```
https://seu-projeto.vercel.app/api/enviar-email?email=teste@email.com&frase=Olá+Matheus
```