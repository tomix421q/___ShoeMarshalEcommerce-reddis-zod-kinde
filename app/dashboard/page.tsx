import Chart from '@/components/dashboard/Chart'
import DashboardStats from '@/components/dashboard/DashboardStats'
import RecentSales from '@/components/dashboard/RecentSales'
import prisma from '@/utils/db'
import { unstable_noStore as noStore } from 'next/cache'

const getData = async () => {
  const now = new Date()
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(now.getDate() - 7)

  const data = prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const result = (await data).map((item) => ({
    date: new Intl.DateTimeFormat('en-US').format(item.createdAt),
    revenue: item.amount / 100,
  }))

  return result
}

const Dashboard = async () => {
  noStore()
  const data = await getData()
  return (
    <>
      <DashboardStats />
      <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10'>
        <Chart data={data} />
        <RecentSales />
      </div>
    </>
  )
}
export default Dashboard
