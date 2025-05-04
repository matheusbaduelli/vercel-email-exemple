API de Envio de E-mail para Vercel
Esta é uma API simples para envio de e-mails através de requisições HTTP GET, projetada para ser implantada na Vercel.
Configuração

Clone este repositório
Instale as dependências:
npm install

Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto (use o arquivo .env de exemplo fornecido)
Na Vercel, adicione as mesmas variáveis de ambiente no dashboard do seu projeto



Variáveis de ambiente necessárias

SMTP_HOST: Servidor SMTP (ex: smtp.gmail.com)
SMTP_PORT: Porta do servidor SMTP (ex: 587)
SMTP_SECURE: Se deve usar SSL/TLS (true/false)
SMTP_USER: Seu usuário/email SMTP
SMTP_PASSWORD: Sua senha SMTP
DEFAULT_FROM_EMAIL: Email padrão do remetente

Como usar a API
A API aceita requisições GET com os seguintes parâmetros na URL:
Parâmetros obrigatórios:

to: Endereço de email do destinatário
message: Conteúdo da mensagem

Parâmetros opcionais:

subject: Assunto do email (padrão: "Mensagem da API")
from: Email do remetente (padrão: valor de DEFAULT_FROM_EMAIL)

Exemplo de uso:
https://seu-dominio-vercel.vercel.app/api/send-email?to=destinatario@email.com&subject=Teste&message=Esta%20é%20uma%20mensagem%20de%20teste
Resposta da API
Sucesso:
json{
  "success": true,
  "message": "Email enviado com sucesso"
}
Erro:
json{
  "error": "Mensagem de erro",
  "details": "Detalhes do erro (quando disponível)"
}
Deploy na Vercel

Instale a CLI da Vercel:
npm install -g vercel

Faça login na sua conta Vercel:
vercel login

Deploy:
vercel

Para ambiente de produção:
vercel --prod


Alternativamente, você pode conectar seu repositório GitHub/GitLab/Bitbucket à Vercel para deploy automático.
Notas de segurança

Em um ambiente de produção, considere adicionar autenticação (como um token de API)
Para maior segurança, você pode querer limitar os domínios de email permitidos
Considere adicionar rate limiting para evitar abuso da API