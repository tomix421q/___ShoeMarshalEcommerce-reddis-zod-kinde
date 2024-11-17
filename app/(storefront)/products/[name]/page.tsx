import ProductCart from '@/components/storefront/ProductCart'
import prisma from '@/utils/db'
import { notFound } from 'next/navigation'

const getData = async (productCategory: string) => {
  switch (productCategory) {
    case 'all': {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
        where: {
          status: 'published',
        },
      })
      return { title: 'All Products', data: data }
    }
    case 'men': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'men',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      })
      return { title: 'Products for Men', data: data }
    }
    case 'women': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'women',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      })
      return { title: 'Products for Women', data: data }
    }
    case 'kids': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'kids',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      })
      return { title: 'Products for Kids', data: data }
    }
    default: {
      return notFound()
    }
  }
}

const CategoriesPage = async ({ params }: { params: { name: string } }) => {
  const { name } = await params
  const { data, title } = await getData(name)

  return (
    <section>
      <h1 className='font-semibold text-3xl my-5'>{title ? title : 'No products :('}</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {data.map((item) => (
          <ProductCart item={item} key={item.id} />
        ))}
      </div>
    </section>
  )
}
export default CategoriesPage