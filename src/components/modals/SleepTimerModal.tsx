import React from 'react';
import { X, Clock, Check } from 'lucide-react';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { toBengaliNumber } from '../../utils/bengaliUtils';

interface SleepTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SleepTimerModal: React.FC<SleepTimerModalProps> = ({ isOpen, onClose }) => {
  const { sleepTimerMinutes, sleepTimerRemaining, setSleepTimer } = useAudioPlayer();

  if (!isOpen) return null;

  const timerOptions = [
    { label: 'টাইমার বন্ধ', value: null },
    { label: '১৫ মিনিট পর বন্ধ হবে', value: 15 },
    { label: '৩০ মিনিট পর বন্ধ হবে', value: 30 },
    { label: '৪৫ মিনিট পর বন্ধ হবে', value: 45 },
    { label: '৬০ মিনিট (১ ঘণ্টা) পর বন্ধ হবে', value: 60 },
    { label: '৯০ মিনিট পর বন্ধ হবে', value: 90 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 dark:bg-black/80 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl p-5 z-10 border border-stone-100 dark:border-stone-800 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-50 dark:bg-orange-950/40 text-[#f58c01] border border-orange-100 dark:border-orange-900/50 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">ঘুমের টাইমার (Sleep Timer)</h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">নির্দিষ্ট সময় পর অডিও স্বয়ংক্রিয়ভাবে বন্ধ হবে</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Remaining Time status if active */}
        {sleepTimerRemaining !== null && (
          <div className="mt-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200/80 dark:border-orange-900/40 rounded-2xl p-3 text-center">
            <span className="text-xs text-[#f58c01] font-bold block">
              টাইমার চলছে
            </span>
            <span className="text-xl font-bold text-stone-900 dark:text-stone-100 font-mono mt-0.5 block">
              {toBengaliNumber(Math.floor(sleepTimerRemaining / 60))}:
              {toBengaliNumber(String(sleepTimerRemaining % 60).padStart(2, '0'))} মিনিট বাকি
            </span>
          </div>
        )}

        {/* Options list */}
        <div className="py-3 space-y-1.5">
          {timerOptions.map((opt) => {
            const isSelected = sleepTimerMinutes === opt.value;

            return (
              <button
                key={opt.label}
                onClick={() => {
                  setSleepTimer(opt.value);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#f58c01] text-white shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-4 h-4 stroke-[2.5]" />}
              </button>
            );
          })}
        </div>

        {/* Close Button */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};
