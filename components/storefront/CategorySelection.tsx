import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import all from '@/public/all.jpeg'
import men from '@/public/men.jpeg'
import women from '@/public/women.jpeg'

const CategorySelection = () => {
  return (
    <div className='py-24 sm:py-32'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-extrabold tracking-tight'>Shop category</h2>

        <Link
          href={'/products/all'}
          className='text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-x-3'
        >
          Browse all Products{' '}
          <span>
            <ArrowRight size={15} />
          </span>
        </Link>
      </div>

      {/*  */}
      <div className='mt-6 grid grid-cols-1 gap-x-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8 gap-y-5'>
        {/* all products */}
        <div className='group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:aspect-w-1 sm:row-span-2'>
          <Image src={all} alt={'All products image'} className='object-cover object-center' />
          <div className='bg-gradient-to-b from-transparent to-black opacity-55' />
          <div className='p-6 flex items-end'>
            <div>
              <Link href={'/products/all '}>
                <h3 className='text-white font-semibold'>All Products</h3>
                <p className='mt-1 text-sm text-white'>Shop Now</p>
              </Link>
            </div>
          </div>
        </div>

        {/* men products */}
        <div className='group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full'>
          <Image
            src={men}
            alt={'All products image'}
            className='object-bottom object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full'
          />
          <div className='bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0' />
          <div className='p-6 flex items-end sm:absolute sm:inset-0'>
            <div>
              <Link href={'/products/men '}>
                <h3 className='text-white font-semibold'>Men Products</h3>
                <p className='mt-1 text-sm text-white'>Shop Now</p>
              </Link>
            </div>
          </div>
        </div>

        {/* women products */}
        <div className='group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full'>
          <Image
            src={women}
            alt={'All products image'}
            className='object-bottom object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full'
          />
          <div className='bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0' />
          <div className='p-6 flex items-end sm:absolute sm:inset-0'>
            <div>
              <Link href={'/products/women '}>
                <h3 className='text-white font-semibold'>Women Products</h3>
                <p className='mt-1 text-sm text-white'>Shop Now</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CategorySelection
