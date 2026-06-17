import Navbar from '@/components/Navbar';
import { navLinks } from '@/data/hero';

export default function Home() {
  return (
    <main>
      <Navbar links={navLinks} />
      {/* HeroSection added in Phase 4 */}
      <div className="flex items-center justify-center mt-[68px] min-h-[calc(100vh-68px)] bg-gray-100">
        <p className="text-gray-400 text-sm font-medium">Hero section — coming in Phase 4</p>
      </div>
    </main>
  );
}
