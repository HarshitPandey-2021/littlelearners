// import Navbar from '@/components/Navbar'
import Hero from '@/components/landing/Hero'
import TrustStrip from '@/components/landing/TrustStrip'
import Programs from '@/components/landing/Programs'
import WhyChooseUs from '@/components/landing/WhyChooseUs'
import Outcomes from '@/components/landing/Outcomes'
import CTA from '@/components/landing/CTA'
// import Footer from '@/components/Footer'
export const metadata = {
  title: 'La English Atelier',
  description: 'Interactive online learning for kids aged 5-10. Certified teachers, small batches, live classes.',
}
export default function Home() {
  return (
    <main>
      {/* <Navbar /> */}
      <Hero />
      <TrustStrip />
      <Programs />
      <WhyChooseUs />
      <Outcomes />
      <CTA />
      {/* <Footer /> */}
    </main>
  )
}