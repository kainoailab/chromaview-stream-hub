
import React from 'react';
import { Home, Play, Film, Newspaper, Baby, BookOpen, Gamepad2, Music, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons: Record<string, React.ComponentType<any>> = {
  'All': Home,
  'Sports': Play,
  'Movies': Film,
  'News': Newspaper,
  'Kids': Baby,
  'Documentary': BookOpen,
  'Entertainment': Gamepad2,
  'Music': Music,
};

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-gray-950/90 backdrop-blur-sm border-r border-gray-800/50 z-50 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-800/50 lg:hidden">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Categories</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/10"
              >
                <X size={20} />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex-1 p-4">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 hidden lg:block">
              Categories
            </h3>
            
            <nav className="space-y-1">
              {categories.map((category) => {
                const Icon = categoryIcons[category] || Home;
                const isSelected = selectedCategory === category;
                
                return (
                  <button
                    key={category}
                    onClick={() => {
                      onCategorySelect(category);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-400'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{category}</span>
                    {isSelected && (
                      <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800/50">
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-white mb-2">
                Premium Features
              </h4>
              <p className="text-xs text-gray-400 mb-3">
                Unlock HD streaming, premium channels, and more
              </p>
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
