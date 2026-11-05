import React from 'react';
import { Menu, Search, Download, Sun, Moon } from 'lucide-react';
import { Logo } from './Logo';
import { toBengaliNumber } from '../../utils/bengaliUtils';
import { useAudioPlayer } from '../../context/AudioPlayerContext';

interface HeaderProps {
  onOpenDrawer: () => void;
  onOpenSearch: () => void;
  onOpenInstallModal?: () => void;
  onOpenDownloadsTab: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDrawer,
  onOpenSearch,
  onOpenDownloadsTab
}) => {
  const { downloads, settings, updateSettings, showToast } = useAudioPlayer();

  const isDarkMode = 
    settings.theme === 'dark' || 
    (settings.theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleTheme = () => {
    const nextTheme = isDarkMode ? 'light' : 'dark';
    updateSettings({ theme: nextTheme });
    showToast(nextTheme === 'dark' ? 'ডার্ক থিম সক্রিয় করা হয়েছে' : 'লাইট থিম সক্রিয় করা হয়েছে', 'info');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md text-stone-900 dark:text-stone-100 border-b border-stone-200/90 dark:border-stone-800/90 shadow-xs transition-colors safe-area-top">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left: Drawer Menu Hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDrawer}
            aria-label="মেনু খুলুন"
            className="p-2 -ml-1 rounded-xl text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-[#f58c01] hover:bg-orange-50 dark:hover:bg-stone-900 active:scale-95 transition-all focus:outline-none cursor-pointer"
          >
            <Menu className="w-6 h-6 stroke-[2.2]" />
          </button>

          <div className="flex items-center gap-2 cursor-pointer select-none">
            <Logo size="sm" variant="orange" />
            <div className="flex flex-col">
              <span className="text-base font-bold leading-tight tracking-tight text-stone-900 dark:text-stone-100">
                আল হিদায়াহ
              </span>
              <span className="text-[10px] font-semibold leading-none text-[#f58c01] tracking-wide">
                অডিও লাইব্রেরি
              </span>
            </div>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5">
          {/* Quick Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'লাইট থিম চালু করুন' : 'ডার্ক থিম চালু করুন'}
            className="p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-[#f58c01] hover:bg-orange-50 dark:hover:bg-stone-900 active:scale-95 transition-all cursor-pointer"
            title={isDarkMode ? 'লাইট থিম চালু করুন' : 'ডার্ক থিম চালু করুন'}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-400 stroke-[2.2]" />
            ) : (
              <Moon className="w-5 h-5 stroke-[2.2]" />
            )}
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="অনুসন্ধান"
            className="p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-[#f58c01] hover:bg-orange-50 dark:hover:bg-stone-900 active:scale-95 transition-all cursor-pointer"
            title="খুঁজুন"
          >
            <Search className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Downloads Counter Icon */}
          <button
            onClick={onOpenDownloadsTab}
            aria-label="ডাউনলোড তালিকা"
            className="relative p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-[#f58c01] hover:bg-orange-50 dark:hover:bg-stone-900 active:scale-95 transition-all cursor-pointer"
            title="ডাউনলোডকৃত অডিও"
          >
            <Download className="w-5 h-5 stroke-[2.2]" />
            {downloads.length > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-[17px] h-[17px] px-1 bg-[#f58c01] text-white text-[10px] font-bold rounded-full shadow-xs leading-none">
                {toBengaliNumber(downloads.length)}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
