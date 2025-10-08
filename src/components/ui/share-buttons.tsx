'use client';

import { Share2, Linkedin, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { GitHubRepo } from '@/lib/github';

interface ShareButtonsProps {
  repo: GitHubRepo;
}

export function ShareButtons({ repo }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const canShare = typeof navigator !== 'undefined' && 'share' in navigator;

  const shareData = {
    title: `${repo.owner.login}/${repo.name}`,
    description: repo.description || 'Check out this repository on GitHub',
    url: repo.html_url,
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`;
    window.open(url, '_blank', 'width=550,height=420');
    setShowShareMenu(false);
  };

  const handleNativeShare = async () => {
    if (canShare) {
      try {
        await navigator.share({
          title: shareData.title,
          text: shareData.description,
          url: shareData.url,
        });
        setShowShareMenu(false);
      } catch (err) {
        console.error('Share failed:', err);
      }
    }
  };

  return (
    <div className="relative">
      {/* Main Share Button - Matching GitHub style */}
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center gap-1 rounded-lg border border-gray-700 bg-[#21262D] px-3 py-1.5 text-sm text-white transition-colors hover:bg-[#30363D] sm:text-base"
        aria-label="Share repository"
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>

      {/* Share menu dropdown */}
      {showShareMenu && (
        <div className="absolute top-full right-0 z-50 mt-2 w-56 rounded-lg border border-gray-700 bg-[#161B22] shadow-2xl">
          <div className="flex flex-col gap-1 p-2">
            {/* LinkedIn */}
            <button
              onClick={shareOnLinkedIn}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-white transition-colors hover:bg-[#30363D]"
            >
              <Linkedin className="h-4 w-4 text-blue-600" />
              Share on LinkedIn
            </button>

            {/* Native Share (only show on supported devices) */}
            {canShare && (
              <button
                onClick={handleNativeShare}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-white transition-colors hover:bg-[#30363D]"
              >
                <Share2 className="h-4 w-4" />
                Share...
              </button>
            )}

            {/* Divider */}
            <div className="my-1 border-t border-gray-700" />

            {/* Copy URL */}
            <button
              onClick={handleCopyUrl}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                copied ? 'bg-green-900/20 text-green-400 hover:bg-green-900/30' : 'text-white hover:bg-[#30363D]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  URL Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy URL
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {showShareMenu && <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />}
    </div>
  );
}
