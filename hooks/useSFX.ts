import useSound from 'use-sound';

export function useSFX() {
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.2 });
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.5 });
  const [playStartup] = useSound('/sounds/startup.mp3', { volume: 0.6 });

  return {
    playHover,
    playClick,
    playStartup
  };
}