
import React, { useState } from 'react';
import { Search, Upload, Play, Grid, List, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChannelGrid from './ChannelGrid';
import VideoPlayer from './VideoPlayer';
import Sidebar from './Sidebar';

interface Channel {
  id: string;
  name: string;
  url: string;
  logo?: string;
  category: string;
  description?: string;
}

const IPTVApp = () => {
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: '1',
      name: 'Premium Sports HD',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      category: 'Sports',
      description: 'Live sports coverage 24/7'
    },
    {
      id: '2',
      name: 'Movie Central',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      logo: 'https://images.unsplash.com/photo-1489599849675-bb5a18648e7b?w=400&h=300&fit=crop',
      category: 'Movies',
      description: 'Latest blockbuster movies'
    },
    {
      id: '3',
      name: 'News Network',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      logo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop',
      category: 'News',
      description: 'Breaking news and updates'
    },
    {
      id: '4',
      name: 'Entertainment Plus',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=300&fit=crop',
      category: 'Entertainment',
      description: 'Comedy shows and entertainment'
    },
    {
      id: '5',
      name: 'Discovery Science',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
      category: 'Documentary',
      description: 'Science and nature documentaries'
    },
    {
      id: '6',
      name: 'Kids Zone',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      logo: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop',
      category: 'Kids',
      description: 'Safe content for children'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', ...Array.from(new Set(channels.map(c => c.category)))];

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         channel.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || channel.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.m3u')) {
      // Simulate M3U file processing
      console.log('Processing M3U file:', file.name);
      // In a real app, you would parse the M3U file here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Menu */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-white hover:bg-white/10"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Play size={16} fill="white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  StreamView
                </h1>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search channels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 bg-gray-800/50 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="text-white"
                >
                  <Grid size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="text-white"
                >
                  <List size={16} />
                </Button>
              </div>
              
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".m3u,.m3u8"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Upload size={16} className="mr-2" />
                  <span className="hidden sm:inline">Upload M3U</span>
                </Button>
              </label>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {currentChannel && (
            <div className="mb-6">
              <VideoPlayer
                channel={currentChannel}
                onClose={() => setCurrentChannel(null)}
              />
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                {selectedCategory === 'All' ? 'All Channels' : selectedCategory}
              </h2>
              <span className="text-gray-400">
                {filteredChannels.length} channel{filteredChannels.length !== 1 ? 's' : ''}
              </span>
            </div>

            <ChannelGrid
              channels={filteredChannels}
              onChannelSelect={setCurrentChannel}
              viewMode={viewMode}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default IPTVApp;
