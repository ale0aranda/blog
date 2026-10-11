'use client';

import { useRef, useState } from 'react';

import { Music, Volume2, VolumeX } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/cn';

import { DockTooltip } from './dock-tooltip';
import { dockButtonClass } from './styles';

const MUSIC_SOURCE = '/audio/31-minutos-intro.mp3';

export function DockMusicButton() {
  const t = useTranslations('shared.dock');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  async function toggleMusic() {
    const audio = audioRef.current;

    if (!audio || unavailable) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setUnavailable(true);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  const label = unavailable ? t('music.unavailable') : playing ? t('music.pause') : t('music.play');

  return (
    <>
      {/* biome-ignore lint/a11y/useMediaCaption: This is an instrumental music track with no spoken content. */}
      <audio
        onEnded={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
          setUnavailable(true);
        }}
        preload="none"
        ref={audioRef}
        src={MUSIC_SOURCE}
      />

      <DockTooltip label={label}>
        <button
          aria-label={label}
          className={cn(dockButtonClass, playing && 'bg-surface text-fg')}
          disabled={unavailable}
          onClick={toggleMusic}
          type="button"
        >
          {unavailable ? (
            <VolumeX
              aria-hidden="true"
              size={19}
              strokeWidth={1.6}
            />
          ) : playing ? (
            <Volume2
              aria-hidden="true"
              size={19}
              strokeWidth={1.6}
            />
          ) : (
            <Music
              aria-hidden="true"
              size={19}
              strokeWidth={1.6}
            />
          )}
        </button>
      </DockTooltip>
    </>
  );
}
