'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../lib/utils'

export const navbarLinks = [
  {
    id: 0,
    name: 'Home',
    href: '/',
  },
  {
    id: 1,
    name: 'All Products',
    href: '/products/all',
  },
  {
    id: 2,
    name: 'Men',
    href: '/products/men',
  },
  {
    id: 3,
    name: 'Women',
    href: '/products/women',
  },
  {
    id: 4,
    name: 'Kids',
    href: '/products/kids',
  },
]

const NavbarLinks = () => {
  const location = usePathname()

  return (
    <div className='hidden md:flex justify-center items-center gap-x-2 ml-8'>
      {navbarLinks.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            location === item.href ? 'bg-muted' : 'hover:bg-muted hover:bg-opacity-75',
            'p-2 rounded-sm font-medium group'
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}
export default NavbarLinks
