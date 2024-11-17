import { DollarSign, PartyPopper, ShoppingBag, User2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import prisma from '@/utils/db'

const getData = async () => {
  const [user, products, orders] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
      },
    }),
    prisma.product.findMany({
      select: {
        id: true,
      },
    }),
    prisma.order.findMany({
      select: {
        amount: true,
      },
    }),
  ])

  return { user, products, orders }
}

const DashboardStats = async () => {
  const { user, products, orders } = await getData()

  const totalAmount = orders.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.amount
  }, 0)

  return (
    <>
      <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2 my-auto'>
            <CardTitle className='text-3xl font-bold'>Total Revenue</CardTitle>
            <DollarSign className='size-8 text-green-500' />
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold '>{new Intl.NumberFormat('en-US').format(totalAmount / 100)} €</p>
            <p className='text-xs text-muted-foreground'>Based on 100 Charges</p>
          </CardContent>
        </Card>
        {/*  */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2 my-auto'>
            <CardTitle className='text-3xl font-bold'>Total Sales</CardTitle>
            <ShoppingBag className='size-8 text-blue-500' />
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold '>+{orders.length}</p>
            <p className='text-xs text-muted-foreground'>Total Sales on ShueMarshal</p>
          </CardContent>
        </Card>
        {/*  */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2 my-auto'>
            <CardTitle className='text-3xl font-bold'>Total Products</CardTitle>
            <PartyPopper className='size-8 text-indigo-500' />
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold '>{products.length}</p>
            <p className='text-xs text-muted-foreground'>Total Products Created</p>
          </CardContent>
        </Card>
        {/*  */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2 my-auto'>
            <CardTitle className='text-3xl font-bold'>Total Users</CardTitle>
            <User2 className='size-8 text-orange-500' />
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold '>{user.length}</p>
            <p className='text-xs text-muted-foreground'>Total Users Signed Up</p>
          </CardContent>
        </Card>
      </div>

    </>
  )
}
export default DashboardStats
