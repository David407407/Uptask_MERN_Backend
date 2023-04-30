import nodemailer from 'nodemailer'
export const emailRegistro = async datos => {
    const { email, token, nombre } = datos
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    // Informacion del email
    const info = await transport.sendMail({
        from: '"Uptask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "Uptask - Confirma tu Cuenta",
        text: "Comprueba tu cuenta en Uptask",
        html: `
            <p>Hola ${nombre}, comprueba tu cuenta en Uptask</p>
            <p>Tu cuenta ya esta casi lista. solo debes comprobarla en el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    })
}

export const emailOlvidePassword = async datos => {
    const { email, token, nombre } = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    // Informacion del email
    const info = await transport.sendMail({
        from: '"Uptask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "Uptask - Reestablece tu Password",
        text: "Reestablece tu Password",
        html: `
            <p>Hola ${nombre}, has solicitado reestablecer tu password</p>
            <p>Sigue el siguiente enlace para generar tu nuevo password:</p>
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
            <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
        `
    })
}