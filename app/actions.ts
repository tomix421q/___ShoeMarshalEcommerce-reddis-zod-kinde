'use server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { parseWithZod } from '@conform-to/zod'
import { bannerSchema, productSchema } from '@/utils/zodSchemas'
import prisma from '@/utils/db'
import { redis } from '@/utils/redis'
import { Cart } from '@/utils/interfaces'
import { revalidatePath } from 'next/cache'
import { stripe } from '@/utils/stripe'
import Stripe from 'stripe'

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user.email !== 'zilka.tomas421@gmail.com') {
    return redirect('/')
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  const flattenUrls = submission.value.images.flatMap((urlString) => urlString.split(',').map((url) => url.trim()))

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured,
    },
  })
  redirect('/dashboard/products')
}

export const editProduct = async (prevState: unknown, formData: FormData) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user.email !== 'zilka.tomas421@gmail.com') {
    return redirect('/')
  }

  const submission = parseWithZod(formData, { schema: productSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const flattenUrls = submission.value.images.flatMap((urlString) => urlString.split(',').map((url) => url.trim()))
  const productId = formData.get('productId') as string
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  })

  redirect('/dashboard/products')
}

export const deleteProduct = async (formData: FormData) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user.email !== 'zilka.tomas421@gmail.com') {
    return redirect('/')
  }

  await prisma.product.delete({
    where: {
      id: formData.get('productId') as string,
    },
  })

  redirect('/dashboard/products')
}

export const createBanner = async (prevState: unknown, formData: FormData) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user.email !== 'zilka.tomas421@gmail.com') {
    return redirect('/')
  }

  const submission = parseWithZod(formData, { schema: bannerSchema })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  })

  redirect('/dashboard/banner')
}

export const deleteBanner = async (formData: FormData) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user.email !== 'zilka.tomas421@gmail.com') {
    return redirect('/')
  }

  await prisma.banner.delete({
    where: {
      id: formData.get('bannerId') as string,
    },
  })

  redirect('/dashboard/banner')
}

export const addItem = async (productId: string) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    return redirect('/')
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`)

  const selectedProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
  })

  if (!selectedProduct) {
    throw new Error('No product with this id')
  }

  //
  // REDIS
  let myCart = {} as Cart

  if (!cart || !cart.items) {
    myCart = {
      userId: user.id,
      items: [
        {
          price: selectedProduct.price,
          id: selectedProduct.id,
          imageString: selectedProduct.images[0],
          name: selectedProduct.name,
          quantity: 1,
        },
      ],
    }
  } else {
    let itemFound = false
    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true
        item.quantity += 1
      }
      return item
    })

    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        imageString: selectedProduct.images[0],
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: 1,
      })
    }
  }
  await redis.set(`cart-${user.id}`, myCart)
  revalidatePath('/', 'layout')
}

export const deleteItem = async (formData: FormData) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    return redirect('/')
  }

  const productId = formData.get('productId')

  const cart: Cart | null = await redis.get(`cart-${user.id}`)

  if (cart && cart.items) {
    const updateCart: Cart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    }
    await redis.set(`cart-${user.id}`, updateCart)
  }
  revalidatePath('/bag')
}

export const checkOut = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) {
    return redirect('/')
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`)

  if (cart && cart.items) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.items.map((item) => ({
      price_data: {
        currency: 'eur',
        unit_amount: item.price * 100,
        product_data: {
          name: item.name,
          images: [item.imageString],
        },
      },

      quantity: item.quantity,
    }))
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/payment/success'
          : 'https://shoe-marshal-ecommerce-reddis-zod-kinde-djqd.vercel.app/payment/success',
      cancel_url:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/payment/cancel'
          : 'https://shoe-marshal-ecommerce-reddis-zod-kinde-djqd.vercel.app/payment/cancel',
      metadata: {
        userId: user.id,
      },
    })
    return redirect(session.url as string)
  }
}
