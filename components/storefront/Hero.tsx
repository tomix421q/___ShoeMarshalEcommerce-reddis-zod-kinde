import prisma from '@/utils/db'
import CarouselClient, { bannerProps } from './CarouselClient'

const getData = async () => {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return data
}

const Hero = async () => {
  const data: bannerProps[] = await getData()

  return <CarouselClient banner={data} />
}
export default Hero
