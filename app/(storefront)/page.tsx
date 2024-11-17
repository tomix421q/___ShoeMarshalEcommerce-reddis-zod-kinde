import CategorySelection from '@/components/storefront/CategorySelection'
import FeaturedProducts from '@/components/storefront/FeaturedProducts'
import Hero from '@/components/storefront/Hero'
import Navbar from '@/components/storefront/Navbar'

const IndexPage = () => {
  return (
    <div>
      <Hero />
      <CategorySelection />
      <FeaturedProducts />
   
    </div>
  )
}
export default IndexPage
