'use client'
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Line } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

interface iAppProps {
  data: {
    date: string
    revenue: number
  }[]
}

const aggregateData = (data: any) => {
  const aggregated = data.reduce((acc: any, curr: any) => {
    if (acc[curr.date]) {
      acc[curr.date] += curr.revenue
    } else {
      acc[curr.date] = curr.revenue
    }
    return acc
  }, {})

  return Object.keys(aggregated).map((date) => ({
    date,
    revenue: aggregated[date],
  }))
}

const Chart = ({ data }: iAppProps) => {
  const proccesedData = aggregateData(data)
  return (
    <Card className='xl:col-span-2'>
      <CardHeader>
        <CardTitle className='text-3xl font-bold'>Transactions</CardTitle>
        <CardDescription>Recent transactions from the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width={'100%'} height={400}>
          <LineChart data={proccesedData}>
            <CartesianGrid strokeDasharray={'3 3'} />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type={'monotone'} stroke='#3b82f6' activeDot={{ r: 8 }} dataKey={'revenue'} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
export default Chart
