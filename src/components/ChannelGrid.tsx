
import React from 'react';
import { Play, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Channel {
  id: string;
  name: string;
  url: string;
  logo?: string;
  category: string;
  description?: string;
}

interface ChannelGridProps {
  channels: Channel[];
  onChannelSelect: (channel: Channel) => void;
  viewMode: 'grid' | 'list';
}

const ChannelGrid: React.FC<ChannelGridProps> = ({ channels, onChannelSelect, viewMode }) => {
  if (channels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Play size={32} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-300">No channels found</h3>
        <p className="text-gray-500">Try adjusting your search or category filters</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-3">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="group bg-gray-900/50 hover:bg-gray-800/50 rounded-xl p-4 transition-all duration-300 border border-gray-800/50 hover:border-gray-700 cursor-pointer"
            onClick={() => onChannelSelect(channel)}
          >
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <img
                  src={channel.logo}
                  alt={channel.name}
                  className="w-16 h-12 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Play size={16} fill="white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate">{channel.name}</h3>
                <p className="text-gray-400 text-sm truncate">{channel.description}</p>
              </div>
              
              <div className="flex items-center gap-3 text-gray-400">
                <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
                  {channel.category}
                </span>
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span className="text-xs">{Math.floor(Math.random() * 1000) + 100}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
      {channels.map((channel) => (
        <div
          key={channel.id}
          className="group relative bg-gray-900/30 hover:bg-gray-800/50 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 border border-gray-800/30 hover:border-gray-700"
          onClick={() => onChannelSelect(channel)}
        >
          {/* Channel Image */}
          <div className="relative aspect-video overflow-hidden">
            <img
              src={channel.logo}
              alt={channel.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
              >
                <Play size={16} fill="white" className="mr-2" />
                Play
              </Button>
            </div>
            
            {/* Category Badge */}
            <div className="absolute top-3 right-3">
              <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {channel.category}
              </span>
            </div>
            
            {/* Live Indicator */}
            <div className="absolute top-3 left-3 flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white text-xs font-medium">LIVE</span>
            </div>
          </div>
          
          {/* Channel Info */}
          <div className="p-4">
            <h3 className="font-semibold text-white truncate mb-1 group-hover:text-blue-400 transition-colors">
              {channel.name}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-3">
              {channel.description}
            </p>
            
            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Users size={12} />
                <span>{Math.floor(Math.random() * 1000) + 100} viewers</span>
              </div>
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                HD
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChannelGrid;
