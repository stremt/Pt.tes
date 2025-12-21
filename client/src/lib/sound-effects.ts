import completionSoundUrl from "@assets/completion-sound.mp3";

export const playCompletionSound = () => {
  try {
    const audio = new Audio(completionSoundUrl);
    audio.volume = 0.7;
    audio.play().catch(err => {
      console.log("Sound playback not available:", err);
    });
  } catch (error) {
    console.log("Could not play sound effect:", error);
  }
};
