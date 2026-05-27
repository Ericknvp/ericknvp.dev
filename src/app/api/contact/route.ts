import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json()

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Todos los campos son requeridos.' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: 'narvaezvegaerick@gmail.com',
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
  })

  if (error) {
    return NextResponse.json({ error: 'Error al enviar el mensaje.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
