import completionSoundUrl from "@assets/completion-sound.mp3";
import errorSoundUrl from "@assets/sample_error_input03_kofi_by_miraclei-363641_1766285632222.mp3";

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

export const playErrorSound = () => {
  try {
    const audio = new Audio(errorSoundUrl);
    audio.volume = 0.6;
    audio.play().catch(err => {
      console.log("Sound playback not available:", err);
    });
  } catch (error) {
    console.log("Could not play error sound:", error);
  }
};
