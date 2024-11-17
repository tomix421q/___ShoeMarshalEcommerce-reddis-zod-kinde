'use client'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ChevronLeft, XIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { UploadDropzone } from '@/utils/uploadthing'
import { SubmitButton } from '../SubmitButtons'
import { useActionState, useEffect, useState } from 'react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import {  editProduct } from '@/app/actions'
import { productSchema } from '@/utils/zodSchemas'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import Image from 'next/image'
import { categories } from '@/utils/categories'
import { type $Enums } from '@prisma/client'

interface iAppProps {
  data: {
    images: string[]
    name: string
    description: string
    status: $Enums.ProductStatus
    price: number
    category: $Enums.Category
    isFeatured: boolean
    id: string
  }
}

const EditForm = ({ data }: iAppProps) => {
  const [images, setImages] = useState<string[]>(data.images)
  const [newImages, setNewImages] = useState<string[]>()
  const [lastResult, action] = useActionState(editProduct, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema })
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  })

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  useEffect(() => {
    if (newImages && newImages.length > 0) {
      setImages((prevImages) => [...prevImages, ...newImages])
    }
  }, [newImages])

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <input type='hidden' name='productId' value={data.id} />
      <div className='flex items-center gap-4'>
        <Button variant={'outline'} size={'icon'} asChild>
          <Link href={'/dashboard/products'}>
            <ChevronLeft className='!size-4' />
          </Link>
        </Button>
        <h1 className='text-xl font-semibold tracking-tight'>Edit Product</h1>
      </div>

      <Card className='mt-5'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>Product Details</CardTitle>
          <CardDescription>In this form you can edit product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
              <Label>Name</Label>
              <Input
                type='text'
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={data.name}
                className='w-full'
                placeholder='Product name'
              />
              <p className='text-red-500'>{fields.name.errors}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={data.description}
                placeholder='Write your description here...'
              />
              <p className='text-red-500'>{fields.description.errors}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Price</Label>
              <Input key={fields.price.key} name={fields.price.name} defaultValue={data.price} type='number' placeholder='$55' />
              <p className='text-red-500'>{fields.price.errors}</p>
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Featured Product</Label>
              <Switch key={fields.isFeatured.key} name={fields.isFeatured.name} defaultChecked={data.isFeatured} />
              <p className='text-red-500'>{fields.isFeatured.errors}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Status</Label>
              <Select key={fields.status.key} name={fields.status.name} defaultValue={data.status}>
                <SelectTrigger>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='draft'>Draft</SelectItem>
                  <SelectItem value='published'>Published</SelectItem>
                  <SelectItem value='archived'>Archived</SelectItem>
                </SelectContent>
              </Select>
              <p className='text-red-500'>{fields.status.errors}</p>
            </div>
            <div>
              <Label>Category</Label>
              <Select key={fields.category.key} name={fields.category.name} defaultValue={data.category}>
                <SelectTrigger>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className='text-red-500'>{fields.category.errors}</p>
            </div>

            {/*  */}
            {/* IMAGE */}
            {/*  */}
            <div className='flex flex-col gap-3'>
              <Label>Images</Label>
              <input
                type='hidden'
                value={images}
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={fields.images.initialValue as any}
              />
              {images.length > 0 ? (
                <div className='flex flex-col gap-14'>
                  <div className='flex gap-5'>
                    {images.map((image, index) => (
                      <div className='relative w-[100px] h-[100px]' key={index}>
                        <Image
                          src={image}
                          alt={'product image'}
                          className='w-full h-full object-cover rounded-lg border'
                          height={100}
                          width={100}
                        />
                        <button
                          type='button'
                          onClick={() => handleDelete(index)}
                          className='absolute -top-3 -right-3 bg-red-500 p-1 rounded-lg text-white'
                        >
                          <XIcon className='size-4' />
                        </button>
                      </div>
                    ))}
                  </div>
                  <UploadDropzone
                    className=''
                    endpoint={'imageUploader'}
                    onClientUploadComplete={(res) => {
                      setNewImages(res.map((r) => r.url))
                    }}
                    onUploadError={() => {
                      alert('Something went wrong')
                    }}
                  />
                </div>
              ) : (
                <UploadDropzone
                  className=''
                  endpoint={'imageUploader'}
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url))
                  }}
                  onUploadError={() => {
                    alert('Something went wrong')
                  }}
                />
              )}
              <p className='text-red-500'>{fields.images.errors}</p>
            </div>
            {/*  */}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text='Edit product' />
        </CardFooter>
      </Card>
    </form>
  )
}
export default EditForm
