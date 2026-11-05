import React, { useState } from 'react';
import { 
  Sparkles, 
  Play, 
  Pause, 
  ChevronRight, 
  BookOpen, 
  Mic2, 
  Flame,
  Volume2,
  CheckCircle2
} from 'lucide-react';
import { AudioCard } from './AudioCard';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { formatDurationBengali, toBengaliNumber } from '../../utils/bengaliUtils';
import { Speaker, AudioItem } from '../../types/audio';
import { TabType } from '../common/BottomNav';

interface HomeScreenProps {
  onSelectSpeaker: (speaker: Speaker) => void;
  onSelectCategory: (categoryId: string) => void;
  onNavigateTab: (tab: TabType) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectSpeaker,
  onSelectCategory,
  onNavigateTab
}) => {
  const { currentAudio, isPlaying, playAudio, togglePlay, audios, speakers } = useAudioPlayer();
  const [selectedFilter, setSelectedFilter] = useState<string>('সকল');

  // Featured audio (first with isFeatured or fallback to first audio in catalog)
  const featuredAudio = audios.find(a => a.isFeatured) || audios[0];
  const isFeaturedPlaying = featuredAudio && currentAudio?.id === featuredAudio.id && isPlaying;

  // Filter tags
  const filterTags = ['সকল', 'কুরআন তিলাওয়াত ও অর্থ', 'তাওবা ও আত্মশুদ্ধি', 'পরিবার ও সমাজ সংস্কার', 'ঈমান ও আকীদা'];
  
  const displayAudios = selectedFilter === 'সকল' 
    ? audios 
    : audios.filter(a => a.category === selectedFilter);

  // Quran audios
  const quranAudios = audios.filter(a => a.category === 'কুরআন তিলাওয়াত ও অর্থ');

  return (
    <div className="pb-32 px-4 pt-4 max-w-md mx-auto space-y-6">
      
      {/* Hero Featured Audio Banner - White primary card with #f58c01 secondary accents */}
      {featuredAudio && (
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-5 border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-md transition-all">
          {/* Subtle warm decorative glow */}
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-orange-100/50 dark:bg-orange-950/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-900/50 text-[11px] font-bold tracking-wide text-[#f58c01]">
                <Sparkles className="w-3.5 h-3.5 text-[#f58c01]" />
                আজকের নির্বাচিত অডিও
              </span>

              <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 font-mono">
                {formatDurationBengali(featuredAudio.duration)}
              </span>
            </div>

            <div className="my-3.5">
              <h2 className="text-lg font-bold leading-snug text-stone-900 dark:text-stone-100 hover:text-[#f58c01] transition-colors">
                {featuredAudio.title}
              </h2>
              <div className="flex items-center gap-2 mt-1.5 text-stone-600 dark:text-stone-400 text-xs">
                <span className="font-semibold text-stone-900 dark:text-stone-200">{featuredAudio.speakerName}</span>
                <span>•</span>
                <span className="bg-stone-100 dark:bg-stone-800 text-[#f58c01] px-2 py-0.5 rounded-md text-[10px] font-semibold">
                  {featuredAudio.category}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800 mt-1">
              <div className="flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                <Volume2 className="w-3.5 h-3.5 text-[#f58c01]" />
                <span>{toBengaliNumber(featuredAudio.playCount)} বার শোনা হয়েছে</span>
              </div>

              <button
                onClick={() => {
                  if (isFeaturedPlaying) {
                    togglePlay();
                  } else {
                    playAudio(featuredAudio, audios);
                  }
                }}
                className="flex items-center gap-2 bg-[#f58c01] hover:bg-[#e07500] text-white active:scale-95 px-4 py-2 rounded-2xl font-bold text-xs shadow-md shadow-orange-500/25 transition-all cursor-pointer"
              >
                {isFeaturedPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>থামান</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>এখন শুনুন</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none select-none">
        {filterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedFilter(tag)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === tag
                ? 'bg-[#f58c01] text-white shadow-xs'
                : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Popular Speakers Horizontal Scroll */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Mic2 className="w-4 h-4 text-[#f58c01]" />
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">জনপ্রিয় বক্তাগণ ও দাঈ</h3>
          </div>
          <button
            onClick={() => onNavigateTab('speakers')}
            className="text-xs font-semibold text-[#f58c01] hover:text-[#e07500] flex items-center gap-0.5 cursor-pointer"
          >
            <span>সব দেখুন</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none select-none">
          {speakers.slice(0, 14).map((speaker) => (
            <div
              key={speaker.id}
              onClick={() => onSelectSpeaker(speaker)}
              className="flex flex-col items-center shrink-0 w-20 group cursor-pointer"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden p-0.5 border-2 border-[#f58c01]/60 group-hover:border-[#f58c01] group-hover:scale-105 transition-all shadow-xs bg-white dark:bg-stone-850">
                <img 
                  src={speaker.image} 
                  alt={speaker.name}
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.onerror = null;
                    target.src = './dr_abu_bakkar_zakaria.png';
                  }}
                />
              </div>
              <span className="text-[11px] font-semibold text-stone-800 dark:text-stone-200 text-center mt-1.5 line-clamp-1 leading-tight group-hover:text-[#f58c01] transition-colors">
                {speaker.name}
              </span>
              <span className="text-[9px] text-stone-400 dark:text-stone-500 font-medium">
                {toBengaliNumber(speaker.totalAudios)} টি অডিও
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Quran Recitation Section */}
      {quranAudios.length > 0 && (
        <section className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-2xl p-3.5 shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#f58c01]" />
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">কুরআন তিলাওয়াত ও বাংলা অর্থ</h3>
            </div>
            <span className="text-[11px] text-[#f58c01] font-semibold bg-orange-50 dark:bg-orange-950/40 border border-orange-100 dark:border-orange-900/50 px-2 py-0.5 rounded-full">
              {toBengaliNumber(quranAudios.length)} টি সূরা
            </span>
          </div>

          <div className="space-y-2">
            {quranAudios.slice(0, 2).map((audio) => (
              <AudioCard key={audio.id} audio={audio} playlist={quranAudios} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Audios Feed */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[#f58c01]" />
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              {selectedFilter === 'সকল' ? 'সর্বশেষ প্রকাশিত আলোচনা' : selectedFilter}
            </h3>
          </div>
          <span className="text-xs font-medium text-stone-400 dark:text-stone-500">
            {toBengaliNumber(displayAudios.length)} টি অডিও
          </span>
        </div>

        <div className="space-y-2.5">
          {displayAudios.map((audio) => (
            <AudioCard key={audio.id} audio={audio} playlist={displayAudios} />
          ))}
        </div>
      </section>

    </div>
  );
};
