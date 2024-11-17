'use client'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

export interface bannerProps {
  id: string
  title: string
  imageString: string
  createdAt: Date
}

const CarouselClient = ({ banner }: { banner: bannerProps[] }) => {
  return (
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: true,
          }),
        ]}
      >
        <CarouselContent>
          {banner.map((item) => (
            <CarouselItem key={item.id}>
              <div className='relative h-[30vh]  lg:h-[50vh]'>
                <Image
                  src={item.imageString}
                  alt='Banner Image'
                  fill
                  sizes='(max-width:990px) 60vh'
                  className='object-cover w-full h-full rounded-xl'
                  priority
                />
                <div className='absolute top-6 left-6 bg-opacity-75 bg-black text-white rounded-xl p-6 shadow-lg transition-transform hover:scale-105 cursor-pointer'>
                  <h1 className='text-2xl lg:text-5xl font-bold'>{item.title}</h1>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='ml-16' />
        <CarouselNext className='mr-16' />
      </Carousel>
    </div>
  )
}
export default CarouselClient
