import { addItem } from '@/app/actions'
import FeaturedProducts from '@/components/storefront/FeaturedProducts'
import ImageSlider from '@/components/storefront/ImageSlider'
import { ShoppingBagButton } from '@/components/SubmitButtons'
import prisma from '@/utils/db'
import { StarIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'

const getData = async (productId: string) => {
  const data = prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      id: true,
      name: true,
    },
  })
  if (!data) {
    return notFound()
  }
  return data
}

const ProductIdRoute = async ({ params }: { params: Promise<{ id: string }> }) => {
  noStore()
  const { id } = await params
  const data = await getData(id)

  const addProductToShoppingCart = addItem.bind(null, id)

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-10'>
        <ImageSlider images={data!.images} />
        <div>
          <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>{data!.name}</h1>
          <p className='text-3xl mt-2 text-gray-900'>{data!.price}€</p>
          <div className='mt-3 flex items-center gap-1'>
            <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
            <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
            <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
            <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
            <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
          </div>
          <p className='text-base text-gray-700 mt-6'>{data?.description}</p>

          <form action={addProductToShoppingCart}>
            <ShoppingBagButton />
          </form>
        </div>
      </div>

      {/* featured products */}
      <div className='mt-16'>
        <FeaturedProducts />
      </div>
    </>
  )
}
export default ProductIdRoute
