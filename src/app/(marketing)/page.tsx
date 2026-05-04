// App.tsx sau src/app/page.tsx
import React from 'react';

// Importăm componentele (asigură-te că path-urile sunt corecte)
import  Navbar  from '@/components/homeComponents/Navbar';
import  Hero  from '@/components/homeComponents/Hero';
import  StyleSelector  from '@/components/homeComponents/StyleSelector';
import  Workflow from '@/components/homeComponents/Workflow';
import  Features  from '@/components/homeComponents/Features';
import  Footer from '@/components/homeComponents/Footer';
import Pricing from '@/components/homeComponents/Pricing';
import Testimonials from '@/components/homeComponents/Testimonials';

function App() {
  return (
    <div className="bg-zinc-950 text-zinc-300 antialiased selection:bg-zinc-100 selection:text-zinc-950 overflow-x-hidden font-sans min-h-screen">
      
      {/* Stil pentru ascunderea scrollbar-ului (echivalent .hide-scrollbar din CSS) */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      <Navbar />
      <Hero />
      <StyleSelector />
      <Workflow />
      <Testimonials />
      <Pricing />
      <Features />
      <Footer />
    </div>
  );
}

export default App;