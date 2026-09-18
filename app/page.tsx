import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyUs from '@/components/WhyUs';
import Products from '@/components/Products';
import Resources from '@/components/Resources';
import WhatWeDo from '@/components/WhatWeDo';
import OurPlant from '@/components/OurPlant';
import Sustainability from '@/components/Sustainability';
import Industries from '@/components/Industries';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <Products />
        <Resources />
        <WhatWeDo />
        <OurPlant />
        <Sustainability />
        <Industries />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
