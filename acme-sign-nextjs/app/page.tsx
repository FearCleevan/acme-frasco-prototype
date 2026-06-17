import Navbar from '@/components/Navbar';
import { navLinks } from '@/data/hero';

export default function Home() {
  return (
    <main>
      <Navbar links={navLinks} />

      {/* Hero placeholder — starts at top:0, gradient goes BEHIND the fixed navbar
          so the navbar's gradient strip and concave corners blend seamlessly */}
      <section
        className="min-h-screen"
        style={{
          paddingTop: '96px',
          background:
            'linear-gradient(135deg, #8B0000 0%, #CC0000 45%, #D44000 72%, #E8720A 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-white text-5xl font-bold">Hero Section — Phase 4</h1>
        </div>
      </section>
    </main>
  );
}
