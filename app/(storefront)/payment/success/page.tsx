import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'
import Link from 'next/link'

const SuccessRoute = () => {
  return (
    <section className='w-full min-h-[80vh] flex items-center justify-center'>
      <Card className='w-[350px]'>
        <div className='p-6'>
          <div className='w-full flex justify-center'>
            <Check className='size-12 rounded-full bg-green-500/30 text-green-500 p-1' />
          </div>

          <div className='mt-3 text-center sm:mt-5 w-full'>
            <h3 className='text-lg leading-6 font-medium '>Payment Successfull</h3>
            <p className='mt-2 text-sm text-muted-foreground'>
              Congrats to your purchase. Your payment was succesfull. We hope enjoy your product.
            </p>

            <Button asChild className='w-full mt-5 sm:mt-6'>
              <Link href={'/'}>Back to Hamepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  )
}
export default SuccessRoute
