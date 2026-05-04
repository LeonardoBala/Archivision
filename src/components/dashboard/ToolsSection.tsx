'use client';

import { Wand2, PaintBucket, LayoutTemplate } from 'lucide-react'; // Am scos Sparkles
import CompareCard from './CompareCard';

const tools = [
  {
    id: 'render',
    title: 'Interior AI Render',
    description: 'Turn sketches or empty rooms into photorealistic designs.',
    icon: <Wand2 className="w-5 h-5" />,
    before: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=800&q=80', 
    after: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    link: '/dashboard/create?mode=render'
  },
  {
    id: 'style',
    title: 'Style Transfer',
    description: 'Apply a new style to an existing photo.',
    icon: <PaintBucket className="w-5 h-5" />,
    before: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    link: '/dashboard/create?mode=style'
  },
  {
    id: 'furnish',
    title: 'Auto Furnish',
    description: 'Automatically add furniture to empty spaces.',
    icon: <LayoutTemplate className="w-5 h-5" />,
    before: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80',
    link: '/dashboard/create?mode=furnish'
  }
];

export default function ToolsSection() {
  return (
    <section>
        <div className="flex items-center gap-2 mb-6">
            {/* Am sters emoji-ul Sparkles de aici */}
            <h2 className="text-xl font-bold text-white">Explore AI Tools</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
                <CompareCard key={tool.id} tool={tool} />
            ))}
        </div>
    </section>
  );
}