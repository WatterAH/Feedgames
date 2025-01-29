export const mailData = (mail: string, token: string | undefined) => {
  return {
    from: "samueltlahuel.m@gmail.com",
    to: mail,
    subject: "Recuperación de contraseña",
    text: "Haz clic en el siguiente enlace para restablecer tu contraseña. El enlace expirará en 15 minutos: [enlace de recuperación]",
    html: `
    <div style="font-family: 'Arial', sans-serif; background-color: #101010; color: #fafafa; padding: 20px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="font-family: 'Pacifico', cursive; font-size: 32px; color: #fafafa; margin: 0;">Feedgames</h1>
      </div>
      <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px;">
        <p style="font-size: 16px; margin: 0 0 15px;"><b>Hola,</b></p>
        <p style="font-size: 16px; margin: 0 0 15px;">
          Recibimos una solicitud para restablecer la contraseña de tu cuenta.
        </p>
        <p style="font-size: 16px; margin: 0 0 15px;">
          Haz clic en el siguiente enlace para crear una nueva contraseña:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="https://feedgames.vercel.app/recover-password?token=${token}" 
            style="display: inline-block; padding: 0.5rem 1.5rem; color: #101010; background-color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 0.75rem;">
            Restablecer mi contraseña
          </a>
        </div>
        <p style="font-size: 16px; margin: 0 0 15px;">Si no solicitaste este cambio, por favor ignora este mensaje.</p>
        <p style="font-size: 16px; margin: 0;">Saludos,</p>
        <p style="font-size: 16px; margin: 0 0 15px;">El equipo de soporte.</p>
        <p style="font-size: 12px; color: #888; text-align: center;">Este enlace expirará en 15 minutos.</p>
      </div>
    </div>
  `,
  };
};
