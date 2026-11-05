import React from 'react';
import { X, Settings, Volume2, Car, Bell, Wifi, Trash2, CheckCircle2, RefreshCw, Music, AlertTriangle, Copy, Check, Sun, Moon, Monitor } from 'lucide-react';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { toBengaliNumber } from '../../utils/bengaliUtils';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { 
    settings, 
    updateSettings, 
    clearAllDownloads, 
    showToast,
    catalog,
    isCatalogLoading,
    refreshCatalog,
    lastPlaybackError,
    clearPlaybackError
  } = useAudioPlayer();
  const [confirmClear, setConfirmClear] = React.useState(false);
  const [copiedLog, setCopiedLog] = React.useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 dark:bg-black/80 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-sm bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl p-5 z-10 max-h-[90vh] overflow-y-auto border border-stone-100 dark:border-stone-800 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-50 dark:bg-orange-950/40 text-[#f58c01] border border-orange-100 dark:border-orange-900/50 rounded-xl">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">অ্যাপ সেটিংস</h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">আপনার পছন্দ অনুযায়ী কাস্টমাইজ করুন</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="py-4 space-y-4">
          
          {/* App Theme (Light / Dark / System) */}
          <div>
            <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-[#f58c01]" />
                <span>অ্যাপের থিম ও প্রদর্শন</span>
              </span>
              <span className="text-[10px] text-[#f58c01] font-semibold">
                {settings.theme === 'light' ? 'লাইট মোড' : settings.theme === 'dark' ? 'ডার্ক মোড' : 'সিস্টেম অটো'}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'light', label: 'লাইট থিম', icon: Sun },
                { id: 'dark', label: 'ডার্ক থিম', icon: Moon },
                { id: 'system', label: 'সিস্টেম', icon: Monitor }
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = settings.theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      updateSettings({ theme: opt.id as any });
                      showToast(
                        opt.id === 'dark' 
                          ? 'ডার্ক থিম সক্রিয় হয়েছে' 
                          : opt.id === 'light' 
                          ? 'লাইট থিম সক্রিয় হয়েছে' 
                          : 'সিস্টেম অনুযায়ী থিম নির্ধারিত হবে',
                        'info'
                      );
                    }}
                    className={`py-2 px-1 flex flex-col items-center justify-center gap-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#f58c01] bg-orange-50 dark:bg-orange-950/40 text-[#f58c01] font-bold shadow-xs'
                        : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audio Quality */}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
            <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block mb-1.5 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-[#f58c01]" />
              <span>অডিও স্ট্রিমিং কোয়ালিটি</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'high', label: 'উচ্চ মান (HD)' },
                { id: 'medium', label: 'স্ট্যান্ডার্ড' },
                { id: 'low', label: 'ডাটা সেভার' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => updateSettings({ audioQuality: opt.id as any })}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    settings.audioQuality === opt.id
                      ? 'border-[#f58c01] bg-orange-50 dark:bg-orange-950/40 text-[#f58c01]'
                      : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Auto Play Next */}
          <div className="flex items-center justify-between py-2 border-t border-stone-100 dark:border-stone-800">
            <div>
              <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                পরবর্তী অডিও স্বয়ংক্রিয় প্লে
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400">
                বর্তমান অডিও শেষ হলে পরবর্তী অডিও চালু হবে
              </span>
            </div>
            <input
              type="checkbox"
              checked={settings.autoPlayNext}
              onChange={(e) => updateSettings({ autoPlayNext: e.target.checked })}
              className="w-4 h-4 accent-[#f58c01] rounded cursor-pointer"
            />
          </div>

          {/* Drive Mode */}
          <div className="flex items-center justify-between py-2 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-start gap-2">
              <Car className="w-4 h-4 text-stone-500 dark:text-stone-400 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                  গাড়িতে ড্রাইভ মোড
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  সহজে ব্যবহারের জন্য বড় বাটন ও মিনিমাল ইন্টারফেস
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.driveMode}
              onChange={(e) => updateSettings({ driveMode: e.target.checked })}
              className="w-4 h-4 accent-[#f58c01] rounded cursor-pointer"
            />
          </div>

          {/* Lock screen notification */}
          <div className="flex items-center justify-between py-2 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-start gap-2">
              <Bell className="w-4 h-4 text-stone-500 dark:text-stone-400 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                  লক স্ক্রিন প্লেয়ার কন্ট্রোল
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  মোবাইল লক থাকা অবস্থায় বা নোটিফিকেশনে প্লেয়ার বাটন
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.notificationEnabled}
              onChange={(e) => updateSettings({ notificationEnabled: e.target.checked })}
              className="w-4 h-4 accent-[#f58c01] rounded cursor-pointer"
            />
          </div>

          {/* Data Saver for Downloads */}
          <div className="flex items-center justify-between py-2 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-start gap-2">
              <Wifi className="w-4 h-4 text-stone-500 dark:text-stone-400 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                  শুধুমাত্র ওয়াইফাই-এ ডাউনলোড
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  মোবাইল ডাটা খরচ কমাতে সহায়তা করে
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.downloadOverWifiOnly}
              onChange={(e) => updateSettings({ downloadOverWifiOnly: e.target.checked })}
              className="w-4 h-4 accent-[#f58c01] rounded cursor-pointer"
            />
          </div>

          {/* Audio Library Sync / Refresh */}
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800">
            <div className="bg-orange-50/70 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-orange-100 dark:bg-orange-900/50 text-[#f58c01] rounded-lg">
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200">অডিও লাইব্রেরি ক্যাটালগ</h4>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400">
                      মোট {toBengaliNumber(catalog.totalAudios)}টি অডিও • সংস্করণ {toBengaliNumber(catalog.version)}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                নতুন ওয়াজ বা তিলাওয়াত যোগ হলে অ্যাপ স্বয়ংক্রিয়ভাবে আপডেট নেয়। আপনি চাইলে এখনি রিমোট সার্ভার থেকে নতুন অডিও চেক করতে পারেন।
              </p>

              <button
                onClick={() => refreshCatalog(true)}
                disabled={isCatalogLoading}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#f58c01] hover:bg-[#e07500] disabled:bg-orange-300 dark:disabled:bg-orange-900 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isCatalogLoading ? 'animate-spin' : ''}`} />
                <span>{isCatalogLoading ? 'আপডেট খোঁজা হচ্ছে...' : 'নতুন অডিওর আপডেট পরীক্ষা করুন'}</span>
              </button>
            </div>
          </div>

          {/* Playback Diagnostics & Error Log */}
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#f58c01]" />
                <span>প্লেব্যাক ডায়াগনস্টিক ও ত্রুটি লগ</span>
              </span>
              {lastPlaybackError && (
                <button
                  onClick={clearPlaybackError}
                  className="text-[10px] text-stone-500 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 underline font-medium cursor-pointer"
                >
                  লগ পরিষ্কার করুন
                </button>
              )}
            </div>

            {lastPlaybackError ? (
              <div className="bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 rounded-2xl p-3 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-800 dark:text-rose-300">সর্বশেষ ব্যর্থ প্লেব্যাক:</span>
                  <span className="text-[10px] text-rose-600 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/60 px-1.5 py-0.5 rounded-full font-mono">
                    {lastPlaybackError.timestamp}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-stone-800 dark:text-stone-200 truncate">{lastPlaybackError.audioTitle}</p>
                  <p className="text-[11px] text-rose-700 dark:text-rose-300 mt-0.5 leading-snug font-medium">
                    {lastPlaybackError.errorMessage}
                  </p>
                </div>
                <div className="bg-white/80 dark:bg-stone-800/80 p-2 rounded-lg border border-rose-150 dark:border-rose-900/40 text-[10px] text-stone-600 dark:text-stone-300 font-mono break-all line-clamp-2 select-all">
                  {lastPlaybackError.urlAttempted}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">
                    কোড: {lastPlaybackError.errorCode || 'N/A'} • নেট: {lastPlaybackError.networkOnline ? 'সচল' : 'বন্ধ'}
                  </span>
                  <button
                    onClick={() => {
                      const text = JSON.stringify(lastPlaybackError, null, 2);
                      navigator.clipboard.writeText(text);
                      setCopiedLog(true);
                      showToast('ত্রুটি লগ ক্লিপবোর্ডে কপি করা হয়েছে', 'success');
                      setTimeout(() => setCopiedLog(false), 2000);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-stone-800 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                  >
                    {copiedLog ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedLog ? 'কপি হয়েছে' : 'লগ কপি করুন'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl p-3 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-[11px] font-medium leading-tight">
                  কোনো প্লেব্যাক ত্রুটি নেই (সব অডিও স্বাভাবিকভাবে চলছে)
                </span>
              </div>
            )}
          </div>

          {/* Clear Storage */}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
            {confirmClear ? (
              <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 rounded-xl p-3 text-center space-y-2">
                <p className="text-[11px] font-semibold text-rose-800 dark:text-rose-300">
                  আপনি কি সমস্ত অফলাইন ডাটা মুছে ফেলতে চান?
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setConfirmClear(false)}
                    className="px-3 py-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    onClick={() => {
                      clearAllDownloads();
                      setConfirmClear(false);
                      showToast('ডাটা পরিষ্কার করা হয়েছে', 'success');
                    }}
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                  >
                    হ্যাঁ, মুছুন
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-stone-600 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>ক্যাশ ও অফলাইন মেমোরি পরিষ্কার করুন</span>
              </button>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#f58c01] hover:bg-[#e07500] text-white rounded-xl text-xs font-bold shadow-md shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
          >
            সম্পন্ন
          </button>
        </div>

      </div>
    </div>
  );
};
