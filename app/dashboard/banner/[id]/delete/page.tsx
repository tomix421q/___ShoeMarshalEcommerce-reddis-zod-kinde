import { deleteBanner } from '@/app/actions'
import { SubmitButton } from '@/components/SubmitButtons'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const DeleteBannerRoute = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return (
    <div className='h-[80vh] flex items-center justify-center'>
      <Card className='max-w-xl'>
        <CardHeader>
          <CardTitle>
            You are sure delete this banner? <br />
          </CardTitle>
          <CardDescription>
            <span>{id}</span>
          </CardDescription>
        </CardHeader>
        <CardFooter className='w-full flex justify-between'>
          <Button variant={'secondary'} asChild>
            <Link href={'/dashboard/banner'}>Cancel</Link>
          </Button>
          <form action={deleteBanner}>
            <input type='hidden' name='bannerId' value={id} />
            <SubmitButton text={'Delete product'} variant={'destructive'} />
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
export default DeleteBannerRoute
