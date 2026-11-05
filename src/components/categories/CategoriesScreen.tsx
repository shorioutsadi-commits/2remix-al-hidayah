import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Grid, 
  Play, 
  BookOpen, 
  ShieldCheck, 
  Compass, 
  Users, 
  Heart, 
  Sparkles, 
  Moon, 
  HelpCircle,
  FolderOpen
} from 'lucide-react';
import { Category, AudioItem } from '../../types/audio';
import { AudioCard } from '../home/AudioCard';
import { toBengaliNumber } from '../../utils/bengaliUtils';
import { useAudioPlayer } from '../../context/AudioPlayerContext';

interface CategoriesScreenProps {
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'ShieldCheck': return ShieldCheck;
    case 'BookOpen': return BookOpen;
    case 'Compass': return Compass;
    case 'Users': return Users;
    case 'Heart': return Heart;
    case 'Sparkles': return Sparkles;
    case 'Moon': return Moon;
    case 'HelpCircle': return HelpCircle;
    default: return FolderOpen;
  }
};

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  selectedCategoryId,
  onSelectCategory
}) => {
  const { playAudio, categories, audios } = useAudioPlayer();

  const selectedCategory = categories.find(c => c.id === selectedCategoryId);

  // If a category is selected, show filtered audios
  if (selectedCategory) {
    const categoryAudios = audios.filter(a => a.category.trim() === selectedCategory.name.trim());
    const Icon = getCategoryIcon(selectedCategory.iconName);

    return (
      <div className="pb-32 px-4 pt-3 max-w-md mx-auto space-y-4 animate-in fade-in">
        {/* Back Button */}
        <button
          onClick={() => onSelectCategory(null)}
          className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-[#f58c01] font-semibold text-xs py-1 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সকল ক্যাটাগরিতে ফিরে যান</span>
        </button>

        {/* Category Header Card */}
        <div className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-3xl p-5 border border-stone-200/90 dark:border-stone-800 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-50 dark:bg-orange-950/40 text-[#f58c01] border border-orange-100 dark:border-orange-900/50 rounded-2xl">
              <Icon className="w-7 h-7 text-[#f58c01]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 leading-tight">
                {selectedCategory.name}
              </h2>
              <p className="text-xs text-[#f58c01] font-semibold mt-0.5">
                {toBengaliNumber(categoryAudios.length)} টি আলোচনা উপলব্ধ
              </p>
            </div>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-300 mt-3.5 leading-relaxed bg-stone-50 dark:bg-stone-800/80 border border-stone-100 dark:border-stone-700/60 p-2.5 rounded-xl">
            {selectedCategory.description}
          </p>

          {categoryAudios.length > 0 && (
            <button
              onClick={() => playAudio(categoryAudios[0], categoryAudios)}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#f58c01] hover:bg-[#e07500] text-white active:scale-95 rounded-xl font-bold text-xs shadow-md shadow-orange-500/25 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>এই বিষয়ের সবগুলো অডিও শুনুন</span>
            </button>
          )}
        </div>

        {/* List of Audios */}
        <div className="space-y-2.5">
          {categoryAudios.length === 0 ? (
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 text-center text-stone-400 dark:text-stone-500 text-xs border border-stone-200 dark:border-stone-800">
              এই ক্যাটাগরিতে আরও নতুন অডিও খুব দ্রুত যুক্ত করা হবে।
            </div>
          ) : (
            categoryAudios.map((audio) => (
              <AudioCard key={audio.id} audio={audio} playlist={categoryAudios} />
            ))
          )}
        </div>

      </div>
    );
  }

  // Categories Grid List
  return (
    <div className="pb-32 px-4 pt-4 max-w-md mx-auto space-y-4">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Grid className="w-5 h-5 text-[#f58c01]" />
          <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">বিষয়ভিত্তিক ক্যাটাগরি</h2>
        </div>
        <span className="text-xs font-semibold text-stone-400 dark:text-stone-500">
          {toBengaliNumber(categories.length)} টি বিভাগ
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat.iconName);

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group bg-white dark:bg-stone-900 rounded-2xl p-4 border border-stone-200/90 dark:border-stone-800 hover:border-[#f58c01] dark:hover:border-[#f58c01] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between active:scale-[0.98]"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#f58c01] flex items-center justify-center group-hover:bg-[#f58c01] group-hover:text-white transition-colors mb-3">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200 group-hover:text-[#f58c01] transition-colors line-clamp-1 leading-snug">
                  {cat.name}
                </h3>

                <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 mt-1 leading-snug">
                  {cat.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-400 dark:text-stone-500 font-medium">
                <span className="text-[#f58c01] font-semibold">
                  {toBengaliNumber(cat.audioCount)} অডিও
                </span>
                <Play className="w-3 h-3 text-stone-300 dark:text-stone-600 group-hover:text-[#f58c01] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
