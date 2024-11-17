'use client'
import { createBanner, createProduct } from '@/app/actions'
import { SubmitButton } from '@/components/SubmitButtons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UploadDropzone } from '@/utils/uploadthing'
import { bannerSchema } from '@/utils/zodSchemas'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState, useState } from 'react'

const CreateBannerRoute = () => {
  const [image, setImages] = useState<string | undefined>(undefined)
  const [lastResult, action] = useActionState(createBanner, undefined)

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerSchema })
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  })

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className='flex items-center gap-x-4'>
        <Button variant={'outline'} size={'icon'} asChild>
          <Link href={'/dashboard/banner'}>
            <ChevronLeft className='size-5' />
          </Link>
        </Button>
        <h1 className='text-xl font-semibold tracking-tight'>New Banner</h1>
      </div>

      <Card className='mt-5'>
        <CardHeader>
          <CardTitle>Banner Details</CardTitle>
          <CardDescription>Create your banner here</CardDescription>
        </CardHeader>

        <CardContent>
          <div className='flex flex-col gap-y-6'>
            <div className='flex flex-col gap-3'>
              <Label>Name</Label>
              <Input
                type='text'
                placeholder='Create title for banner'
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
              />
              <p className='text-red-500'>{fields.title.errors}</p>
            </div>

            <div className='flex flex-col gap-3'>
              <Label>Image</Label>
              <Input
                type='hidden'
                value={image || ''}
                key={fields.imageString.key}
                name={fields.imageString.name}
                defaultValue={fields.imageString.initialValue}
              />
              {image !== undefined ? (
                <Image
                  src={image}
                  alt={'banner image'}
                  width={200}
                  height={200}
                  className='w-[200px] h-[200px] object-cover border rounded-lg'
                />
              ) : (
                <UploadDropzone
                  endpoint={'bannerImageRoute'}
                  onClientUploadComplete={(res) => {
                    setImages(res[0].url)
                  }}
                  onUploadError={() => {
                    alert('Something went wrong')
                  }}
                />
              )}
              <p className='text-red-500'>{fields.imageString.errors}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <SubmitButton text={'Create banner'} />
        </CardFooter>
      </Card>
    </form>
  )
}
export default CreateBannerRoute
