import prisma from '@/utils/db'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Plus } from 'lucide-react'

const getData = async () => {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      id: true,
      User: {
        select: {
          firstName: true,
          profileImage: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return data
}

const RecentSales = async () => {
  const data = await getData()

  return (
    <>
      {/*  */}
      {/* TRANSACTIONS */}
     
        <Card>
          <CardHeader>
            <CardTitle className='text-3xl font-bold'>Recent sales</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-8'>
            {data.map((item) => (
              <div className='flex items-center gap-4' key={item.id}>
                <Avatar className='hidden sm:flex h-9 w-9'>
                  <AvatarImage src={item.User?.profileImage} alt='avatar image' />
                  <AvatarFallback>{item.User?.firstName.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <p className='text-sm font-medium'>{item.User?.firstName}</p>
                  <p className='text-sm text-muted-foreground'>{item.User?.email}</p>
                </div>
                <p className='ml-auto font-medium flex gap-x-1'>
                  <span className='text-green-500'>
                    <Plus size={25} />
                  </span>
                  {new Intl.NumberFormat('en-US').format(item.amount / 100)} €
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
    
    </>
  )
}
export default RecentSales
