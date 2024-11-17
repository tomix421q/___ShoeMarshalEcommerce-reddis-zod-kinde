import prisma from '@/utils/db'
import { redis } from '@/utils/redis'
import { stripe } from '@/utils/stripe'
import { headers } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'

export const POST = async (req: Request) => {
  noStore()
  const body = await req.text()

  const signature = (await headers()).get('Stripe-Signature') as string

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_SECRET_WEBHOOK as string)
  } catch (error: unknown) {
    return new Response(`'Webhook Error stripe : ${error}'`, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object

      await prisma.order.create({
        data: {
          amount: session.amount_total as number,
          status: session.status as string,
          userId: session.metadata?.userId,
        },
      })

      await redis.del(`cart-${session.metadata?.userId}`)
      break
    }
    default: {
      console.log('unhandled event')
    }
  }

  return new Response(null, { status: 200 })
}
