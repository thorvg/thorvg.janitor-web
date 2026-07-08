import shootingUrl from './assets/shooting.mp3';
import hurtUrl from './assets/hurt.mp3';
import deadUrl from './assets/dead.mp3';

export type SoundName = 'shooting' | 'hurt' | 'dead';

const SOURCES: Record<SoundName, string> = {
  shooting: shootingUrl,
  hurt: hurtUrl,
  dead: deadUrl,
};

const ctx = new AudioContext();
const buffers = new Map<SoundName, AudioBuffer>();

const loaded = Promise.all(
  (Object.keys(SOURCES) as SoundName[]).map(async (name) => {
    const res = await fetch(SOURCES[name]);
    buffers.set(name, await ctx.decodeAudioData(await res.arrayBuffer()));
  })
);

// browsers keep the context suspended until a user gesture
function unlock(): void {
  if (ctx.state === 'suspended') void ctx.resume();
  window.removeEventListener('keydown', unlock);
  window.removeEventListener('pointerdown', unlock);
}
window.addEventListener('keydown', unlock);
window.addEventListener('pointerdown', unlock);

export function playSound(name: SoundName, volume = 1.0): void {
  const buffer = buffers.get(name);
  if (!buffer || ctx.state !== 'running') return;

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.value = volume;
  source.connect(gain).connect(ctx.destination);
  source.start();
}

export function soundReady(): Promise<unknown> {
  return loaded;
}
