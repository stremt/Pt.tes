import completionSoundUrl from "@assets/completion-sound.mp3";
import errorSoundUrl from "@assets/sample_error_input03_kofi_by_miraclei-363641_1766285632222.mp3";

const playAudio = (audioUrl: string, volume: number = 0.7) => {
  try {
    console.log("Playing sound from URL:", audioUrl);
    
    // Create audio element
    const audio = document.createElement("audio");
    audio.src = audioUrl;
    audio.volume = volume;
    audio.crossOrigin = "anonymous";
    
    // Append to body temporarily (required for some browsers)
    document.body.appendChild(audio);
    
    // Play the audio
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Audio playing successfully");
          // Remove audio element after it finishes
          audio.addEventListener("ended", () => {
            document.body.removeChild(audio);
          });
        })
        .catch(err => {
          console.log("Audio playback error:", err);
          document.body.removeChild(audio);
        });
    }
  } catch (error) {
    console.log("Could not play audio:", error);
  }
};

export const playCompletionSound = () => {
  playAudio(completionSoundUrl, 0.7);
};

export const playErrorSound = () => {
  playAudio(errorSoundUrl, 0.6);
};
