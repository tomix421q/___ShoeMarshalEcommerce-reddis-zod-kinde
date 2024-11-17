'use client'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Loader2, ShoppingBag } from 'lucide-react'

interface buttonProps {
  text: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null | undefined
}

export const SubmitButton = ({ text, variant }: buttonProps) => {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <div>
          <Button disabled variant={variant}>
            <Loader2 className='size-4 animate-spin mr-2' />
            Please wait
          </Button>
        </div>
      ) : (
        <Button variant={variant} type='submit'>
          {text}
        </Button>
      )}
    </>
  )
}

export const ShoppingBagButton = () => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button disabled size={'lg'} className='w-full mt-5'>
          <Loader2 className='mr-4 size-5 animate-spin' /> Please Wait
        </Button>
      ) : (
        <Button size={'lg'} className='w-full mt-5' type='submit'>
          <ShoppingBag className='mr-4 size-5' /> Add to cart
        </Button>
      )}
    </>
  )
}

export const DeleteItem = () => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button disabled size={'sm'} className='w-full mt-5 text-end' variant={'secondary'}>
          Removing...
        </Button>
      ) : (
        <Button size={'sm'} className='w-full mt-5' type='submit' variant={'secondary'}>
          Delete
        </Button>
      )}
    </>
  )
}

export const CheckoutButton = () => {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button disabled size={'sm'} className='w-full mt-5 text-end' variant={'default'}>
          <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please Wait...
        </Button>
      ) : (
        <Button size={'sm'} className='w-full mt-5' type='submit' variant={'default'}>
          Checkout
        </Button>
      )}
    </>
  )
}
