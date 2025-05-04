require('dotenv').config();

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  const email = req.query.email;
  const frase = req.query.frase;

  if (!email || !frase) {
    return res.status(400).json({ error: 'E-mail e frase são obrigatórios.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Nova mensagem de ${process.env.EMAIL_USER}`,
    text: `O seguinte e-mail: ${process.env.EMAIL_USER} enviou a seguinte mensagem: ${frase}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado:', info.messageId);
    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ error: 'Erro ao enviar o e-mail.' });
  }
};