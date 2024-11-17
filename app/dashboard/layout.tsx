import DashboardNavigation from '@/components/dashboard/DashboardNavigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { CircleUser, MenuIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { unstable_noStore as noStore } from 'next/cache'

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  noStore()
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user.email !== 'zilka.tomas421@gmail.com') {
    redirect('/')
  }

  return (
    <div className='flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <header className='sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white'>
        <nav className='hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
          <DashboardNavigation />
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button className='shrink-0 md:hidden' variant={'outline'} size={'icon'}>
              <MenuIcon className='!size-6' />
            </Button>
          </SheetTrigger>
          <SheetContent side={'left'}>
            <SheetTitle>Menu</SheetTitle>
            <nav className='grid gap-6 text-lg font-medium mt-10'>
              <DashboardNavigation />
            </nav>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'secondary'} size={'icon'}>
              <CircleUser className='!size-7' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel className='text-gray-400 underline'>My account</DropdownMenuLabel>
            <DropdownMenuLabel className='text-gray-400'>{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <LogoutLink>Logout</LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className='my-5'>{children}</main>
    </div>
  )
}
export default DashboardLayout
