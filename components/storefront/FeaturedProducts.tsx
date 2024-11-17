import prisma from '@/utils/db'
import ProductCart, { LoadingProductCard } from './ProductCart'
import { Suspense } from 'react'
import { unstable_noStore as noStore } from 'next/cache'

const getData = async () => {
  const data = await prisma.product.findMany({
    where: {
      status: 'published',
    },

    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      price: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 6,
  })

  return data
}

const FeaturedProducts = () => {
  noStore()
  return (
    <>
      <h2 className='text-2xl font-extrabold tracking-tight'>Featured Items</h2>
      <Suspense fallback={<LoadingRows />}>
        <LoadFeaturedProducts />
      </Suspense>
    </>
  )
}
export default FeaturedProducts

const LoadFeaturedProducts = async () => {
  const data = await getData()

  return (
    <div className='mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-20'>
      {data.map((item) => (
        <ProductCart key={item.id} item={item} />
      ))}
    </div>
  )
}

const LoadingRows = () => {
  return (
    <div className='mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  )
}
