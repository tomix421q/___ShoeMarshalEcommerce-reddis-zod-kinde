import EditForm from '@/components/dashboard/EditForm'
import prisma from '@/utils/db'
import { notFound } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'

const getData = async (productId: string) => {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })

  if (!data) {
    return notFound()
  }
  return data
}

const EditRoute = async ({ params }: { params: Promise<{ id: string }> }) => {
  noStore()
  const { id } = await params
  const data = await getData(id)

  return <EditForm data={data} />
}
export default EditRoute
