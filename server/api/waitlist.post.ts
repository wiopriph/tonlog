import type { D1Database } from '@cloudflare/workers-types'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || typeof body !== 'object' || typeof body.email !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Please enter your email.' })
  }

  const email = body.email.trim().toLowerCase()
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Please check your email address.' })
  }

  // A filled honeypot is rejected without storing personal data.
  if (body.website) {
    throw createError({ statusCode: 400, statusMessage: 'Unable to submit your request.' })
  }

  const db = event.context.cloudflare?.env.DB as D1Database | undefined

  if (!db) {
    throw createError({ statusCode: 503, statusMessage: 'Email signup is temporarily unavailable.' })
  }

  try {
    const result = await db.prepare(
      'INSERT INTO waitlist (email, source) VALUES (?, ?) ON CONFLICT (email) DO NOTHING',
    ).bind(email, 'landing').run()

    if (!result.success) {
      throw new Error('Waitlist insert failed')
    }
  }
  catch {
    throw createError({ statusCode: 503, statusMessage: 'Unable to save your email. Please try again later.' })
  }

  return { success: true }
})
