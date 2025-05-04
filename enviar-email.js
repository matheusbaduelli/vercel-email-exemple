const nodemailer = require('nodemailer');

// Configuração do transporter do Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// Função para validar email
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export default async function handler(req, res) {
  // Permitir apenas requisições GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Obter parâmetros da URL
    const { to, subject, message, from } = req.query;
    
    // Validar parâmetros obrigatórios
    if (!to || !message) {
      return res.status(400).json({ error: 'Parâmetros obrigatórios: to, message' });
    }
    
    // Validar formato de email
    if (!isValidEmail(to)) {
      return res.status(400).json({ error: 'Formato de email inválido' });
    }
    
    // Configurar o remetente padrão se não for fornecido
    const senderEmail = from || process.env.DEFAULT_FROM_EMAIL || 'noreply@example.com';
    const emailSubject = subject || 'Mensagem da API';
    
    // Criar objeto de email
    const mailOptions = {
      from: senderEmail,
      to: to,
      subject: emailSubject,
      text: message,
      html: `<p>${message.replace(/\n/g, '<br>')}</p>`
    };

    // Enviar email
    await transporter.sendMail(mailOptions);
    
    // Responder com sucesso
    return res.status(200).json({ 
      success: true,
      message: 'Email enviado com sucesso'
    });
    
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({ 
      error: 'Erro ao enviar email',
      details: error.message
    });
  }
}