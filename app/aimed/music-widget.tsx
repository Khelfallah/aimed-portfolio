'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FastForward, Pause, Play, Rewind } from 'lucide-react';
import styles from './music-widget.module.css';

const tracks = [
  { title: 'Instrumeleon', artist: 'Cameleon', src: '/music/cameleon-instrumeleon.mp3', artwork: '/optimized/v2/music/cameleon-cover.webp' },
  { title: 'El Adian', artist: 'Cameleon', src: '/music/cameleon-el-adian.mp3', artwork: '/optimized/v2/music/cameleon-cover.webp' },
  { title: 'Tu Veneno', artist: 'J Balvin', src: '/music/j-balvin-tu-veneno.mp3', artwork: '/optimized/v2/music/j-balvin-tu-veneno-cover.webp' },
];

function formatTime(seconds: number) {
  const value = Math.max(0, Math.floor(seconds));
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`;
}

export function MusicWidget() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);
  const audioGraph = useRef<{
    context: AudioContext;
    source: MediaElementAudioSourceNode;
    analyser: AnalyserNode;
  } | null>(null);
  const shouldPlay = useRef(false);
  const playRequest = useRef(0);
  const [activeTrack, setActiveTrack] = useState(0);
  const track = tracks[activeTrack];
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => () => {
    const graph = audioGraph.current;
    if (graph) {
      graph.source.disconnect();
      graph.analyser.disconnect();
      void graph.context.close();
      audioGraph.current = null;
    }
  }, []);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const analyser = audioGraph.current?.analyser;
    const frequencies = new Uint8Array(analyser?.frequencyBinCount ?? 0);
    const waveform = new Uint8Array(analyser?.fftSize ?? 0);
    const bars = Array.from(visualizerRef.current?.children ?? []) as HTMLElement[];
    let frame = 0;

    function reset() {
      artworkRef.current?.style.removeProperty('--music-scale');
      bars.forEach((bar) => bar.style.removeProperty('--bar-level'));
    }

    function draw() {
      if (!analyser) return;
      analyser.getByteFrequencyData(frequencies);
      analyser.getByteTimeDomainData(waveform);
      const rms = Math.sqrt(waveform.reduce((sum, sample) => sum + ((sample - 128) / 128) ** 2, 0) / waveform.length);
      artworkRef.current?.style.setProperty('--music-scale', String(1 + Math.min(rms * 0.16, 0.055)));
      // Log-spaced frequency bands, from bass through treble.
      const boundaries = [1, 3, 7, 15, 31, 63, 128];
      bars.forEach((bar, index) => {
        const start = boundaries[index];
        const end = boundaries[index + 1];
        let sum = 0;
        for (let bin = start; bin < end; bin++) sum += frequencies[bin];
        bar.style.setProperty('--bar-level', String(0.12 + (sum / (end - start) / 255) * 0.88));
      });
      frame = requestAnimationFrame(draw);
    }

    function sync() {
      cancelAnimationFrame(frame);
      reset();
      if (playing && analyser && !motion.matches && !document.hidden) draw();
    }

    sync();
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      cancelAnimationFrame(frame);
      motion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      reset();
    };
  }, [playing, activeTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const request = ++playRequest.current;
    setCurrentTime(0);
    setDuration(0);
    setPlaying(false);
    setError('');
    if (shouldPlay.current) {
      void audio.play().catch(() => {
        if (playRequest.current !== request) return;
        shouldPlay.current = false;
        setError('Unable to play. Please try again.');
      });
    }
    return () => { playRequest.current += 1; };
  }, [activeTrack]);

  function changeTrack(direction: number) {
    playRequest.current += 1;
    setActiveTrack((current) => (current + direction + tracks.length) % tracks.length);
  }

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    const request = ++playRequest.current;
    if (shouldPlay.current) {
      shouldPlay.current = false;
      audio.pause();
      return;
    }
    shouldPlay.current = true;
    setError('');
    try {
      if (!audioGraph.current && typeof AudioContext !== 'undefined') {
        const context = new AudioContext();
        const analyser = context.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.75;
        const source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
        audioGraph.current = { context, source, analyser };
      }
      await audioGraph.current?.context.resume();
      if (playRequest.current !== request || !shouldPlay.current) return;
      if (audio.ended) audio.currentTime = 0;
      await audio.play();
    } catch {
      if (playRequest.current !== request) return;
      shouldPlay.current = false;
      setError('Unable to play. Please try again.');
    }
  }

  function seek(seconds: number) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const position = Math.max(0, Math.min(duration, seconds));
    audio.currentTime = position;
    setCurrentTime(position);
  }

  return (
    <article className={styles.card} aria-labelledby="music-widget-title">
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onLoadedMetadata={(event) => {
          const seconds = event.currentTarget.duration;
          setDuration(Number.isFinite(seconds) ? seconds : 0);
        }}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlaying={() => setPlaying(true)}
        onWaiting={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onEnded={() => { shouldPlay.current = false; setPlaying(false); }}
        onError={() => { shouldPlay.current = false; setPlaying(false); setError('Unable to load this track.'); }}
      />
      <svg className={styles.glassDefinitions} width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="music-control-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cde5fa" stopOpacity="0.82" />
            <stop offset="50%" stopColor="#9dc2e7" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#bedaf4" stopOpacity="0.78" />
          </linearGradient>
        </defs>
      </svg>
      <div className={styles.content}>
        <div className={styles.topRow}>
          <div ref={artworkRef} className={styles.artwork}>
            <Image src={track.artwork} alt={`${track.artist} — ${track.title} artwork`} fill unoptimized sizes="(max-width: 700px) 30vw, (max-width: 1100px) 15vw, 8vw" />
          </div>
          <div ref={visualizerRef} className={styles.visualizer} aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => <span key={index} />)}
          </div>
        </div>

        <div className={styles.track} aria-live="polite">
          <h2 id="music-widget-title">{track.title}</h2>
          <p>{track.artist}</p>
          {error && <span className={styles.error} role="alert">{error}</span>}
        </div>

        <div className={styles.timeline}>
          <span>{formatTime(currentTime)}</span>
          <input
            className={styles.progress}
            type="range"
            min={0}
            max={duration || 1}
            step={0.1}
            value={Math.min(currentTime, duration || 1)}
            disabled={!duration}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label="Playback position"
            aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
          />
          <span>{duration ? `−${formatTime(duration - currentTime)}` : '–:––'}</span>
        </div>

        <div className={styles.controls} role="group" aria-label="Music playback">
          <button type="button" onClick={() => changeTrack(-1)} aria-label="Previous track"><Rewind /></button>
          <button className={styles.play} type="button" onClick={togglePlayback} aria-label={`${playing ? 'Pause' : 'Play'} ${track.title}`}>{playing ? <Pause /> : <Play />}</button>
          <button type="button" onClick={() => changeTrack(1)} aria-label="Next track"><FastForward /></button>
        </div>
      </div>
    </article>
  );
}
