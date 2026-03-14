import type { FFmpeg } from "@ffmpeg/ffmpeg";

let ffmpegInstance: FFmpeg | null = null;
let isLoading = false;
let loadPromise: Promise<FFmpeg> | null = null;

export interface FFmpegProgress {
  ratio: number;
  time: number;
}

async function getModules() {
  const [{ FFmpeg: FFmpegClass }, { toBlobURL }] = await Promise.all([
    import(/* @vite-ignore */ "@ffmpeg/ffmpeg"),
    import(/* @vite-ignore */ "@ffmpeg/util"),
  ]);
  return { FFmpegClass, toBlobURL };
}

export async function loadFFmpeg(
  onProgress?: (progress: FFmpegProgress) => void
): Promise<FFmpeg> {
  if (ffmpegInstance && ffmpegInstance.loaded) {
    if (onProgress) {
      ffmpegInstance.on("progress", ({ progress, time }) => {
        onProgress({ ratio: progress, time });
      });
    }
    return ffmpegInstance;
  }

  if (loadPromise) {
    const instance = await loadPromise;
    if (onProgress) {
      instance.on("progress", ({ progress, time }) => {
        onProgress({ ratio: progress, time });
      });
    }
    return instance;
  }

  loadPromise = (async () => {
    if (isLoading) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return loadFFmpeg(onProgress);
    }

    isLoading = true;

    try {
      const { FFmpegClass, toBlobURL } = await getModules();
      const ffmpeg = new FFmpegClass() as FFmpeg;

      if (onProgress) {
        ffmpeg.on("progress", ({ progress, time }) => {
          onProgress({ ratio: progress, time });
        });
      }

      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      });

      ffmpegInstance = ffmpeg;
      isLoading = false;
      loadPromise = null;
      return ffmpeg;
    } catch (error) {
      isLoading = false;
      loadPromise = null;
      throw new Error(`Failed to load FFmpeg: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  })();

  return loadPromise;
}

async function getFFmpegWithProgress(
  onProgress?: (progress: FFmpegProgress) => void
): Promise<FFmpeg> {
  const ffmpeg = await loadFFmpeg();
  if (onProgress) {
    ffmpeg.on("progress", ({ progress, time }) => {
      onProgress({ ratio: progress, time });
    });
  }
  return ffmpeg;
}

export async function getFFmpeg(): Promise<FFmpeg> {
  if (ffmpegInstance && ffmpegInstance.loaded) {
    return ffmpegInstance;
  }
  return loadFFmpeg();
}

export async function convertVideoToGIF(
  videoFile: File,
  options: {
    fps?: number;
    width?: number;
    quality?: number;
  } = {},
  onProgress?: (progress: FFmpegProgress) => void
): Promise<Blob> {
  const ffmpeg = await getFFmpegWithProgress(onProgress);
  const { fps = 10, width = 480, quality = 80 } = options;

  const inputName = "input.mp4";
  const outputName = "output.gif";

  await ffmpeg.writeFile(inputName, new Uint8Array(await videoFile.arrayBuffer()));

  const scale = `scale=${width}:-1:flags=lanczos`;
  await ffmpeg.exec([
    "-i", inputName,
    "-vf", `${scale},fps=${fps}`,
    "-q:v", Math.round((100 - quality) / 10).toString(),
    outputName
  ]);

  const data = await ffmpeg.readFile(outputName);
  await ffmpeg.deleteFile(inputName);
  await ffmpeg.deleteFile(outputName);

  return new Blob([data], { type: "image/gif" });
}

export async function compressVideo(
  videoFile: File,
  quality: number = 23,
  onProgress?: (progress: FFmpegProgress) => void
): Promise<Blob> {
  const ffmpeg = await getFFmpegWithProgress(onProgress);

  const inputName = "input.mp4";
  const outputName = "output.mp4";

  await ffmpeg.writeFile(inputName, new Uint8Array(await videoFile.arrayBuffer()));

  await ffmpeg.exec([
    "-i", inputName,
    "-c:v", "libx264",
    "-crf", quality.toString(),
    "-preset", "ultrafast",
    "-tune", "fastdecode",
    "-c:a", "aac",
    "-b:a", "128k",
    outputName
  ]);

  const data = await ffmpeg.readFile(outputName);
  await ffmpeg.deleteFile(inputName);
  await ffmpeg.deleteFile(outputName);

  return new Blob([data], { type: "video/mp4" });
}

export async function compressGIF(
  gifFile: File,
  options: {
    width?: number;
    fps?: number;
  } = {},
  onProgress?: (progress: FFmpegProgress) => void
): Promise<Blob> {
  const ffmpeg = await getFFmpegWithProgress(onProgress);
  const { width = 480, fps = 10 } = options;

  const inputName = "input.gif";
  const outputName = "output.gif";

  await ffmpeg.writeFile(inputName, new Uint8Array(await gifFile.arrayBuffer()));

  await ffmpeg.exec([
    "-i", inputName,
    "-vf", `scale=${width}:-1:flags=lanczos,fps=${fps}`,
    outputName
  ]);

  const data = await ffmpeg.readFile(outputName);
  await ffmpeg.deleteFile(inputName);
  await ffmpeg.deleteFile(outputName);

  return new Blob([data], { type: "image/gif" });
}

export async function cutAudio(
  audioFile: File,
  startTime: number,
  endTime: number,
  onProgress?: (progress: FFmpegProgress) => void
): Promise<Blob> {
  const ffmpeg = await getFFmpegWithProgress(onProgress);

  const inputExt = audioFile.name.split('.').pop() || 'mp3';
  const inputName = `input.${inputExt}`;
  const outputName = "output.mp3";

  await ffmpeg.writeFile(inputName, new Uint8Array(await audioFile.arrayBuffer()));

  const duration = endTime - startTime;
  await ffmpeg.exec([
    "-i", inputName,
    "-ss", startTime.toString(),
    "-t", duration.toString(),
    "-c", "copy",
    outputName
  ]);

  const data = await ffmpeg.readFile(outputName);
  await ffmpeg.deleteFile(inputName);
  await ffmpeg.deleteFile(outputName);

  return new Blob([data], { type: "audio/mpeg" });
}

export async function convertAudioToMP3(
  audioFile: File,
  bitrate: string = "192k",
  onProgress?: (progress: FFmpegProgress) => void
): Promise<Blob> {
  const ffmpeg = await getFFmpegWithProgress(onProgress);

  const inputExt = audioFile.name.split('.').pop() || 'wav';
  const inputName = `input.${inputExt}`;
  const outputName = "output.mp3";

  await ffmpeg.writeFile(inputName, new Uint8Array(await audioFile.arrayBuffer()));

  await ffmpeg.exec([
    "-i", inputName,
    "-vn",
    "-ar", "44100",
    "-ac", "2",
    "-b:a", bitrate,
    outputName
  ]);

  const data = await ffmpeg.readFile(outputName);
  await ffmpeg.deleteFile(inputName);
  await ffmpeg.deleteFile(outputName);

  return new Blob([data], { type: "audio/mpeg" });
}

export async function removeAudioNoise(
  audioFile: File,
  noiseReduction: number = 0.21,
  onProgress?: (progress: FFmpegProgress) => void
): Promise<Blob> {
  const ffmpeg = await getFFmpegWithProgress(onProgress);

  const inputExt = audioFile.name.split('.').pop() || 'mp3';
  const inputName = `input.${inputExt}`;
  const outputName = "output.mp3";

  await ffmpeg.writeFile(inputName, new Uint8Array(await audioFile.arrayBuffer()));

  await ffmpeg.exec([
    "-i", inputName,
    "-af", `highpass=f=200,lowpass=f=3000,afftdn=nr=${noiseReduction}`,
    outputName
  ]);

  const data = await ffmpeg.readFile(outputName);
  await ffmpeg.deleteFile(inputName);
  await ffmpeg.deleteFile(outputName);

  return new Blob([data], { type: "audio/mpeg" });
}

export async function convertGIFToMP4(
  gifFile: File,
  onProgress?: (progress: FFmpegProgress) => void
): Promise<Blob> {
  const ffmpeg = await getFFmpegWithProgress(onProgress);

  const inputName = "input.gif";
  const outputName = "output.mp4";

  await ffmpeg.writeFile(inputName, new Uint8Array(await gifFile.arrayBuffer()));

  await ffmpeg.exec([
    "-i", inputName,
    "-movflags", "faststart",
    "-pix_fmt", "yuv420p",
    "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
    outputName
  ]);

  const data = await ffmpeg.readFile(outputName);
  await ffmpeg.deleteFile(inputName);
  await ffmpeg.deleteFile(outputName);

  return new Blob([data], { type: "video/mp4" });
}

export async function convertMP4ToMP3(
  videoFile: File,
  bitrate: string = "192k",
  onProgress?: (progress: FFmpegProgress) => void
): Promise<Blob> {
  const ffmpeg = await getFFmpegWithProgress(onProgress);

  const ext = videoFile.name.split(".").pop()?.toLowerCase() || "mp4";
  const inputName = `input.${ext}`;
  const outputName = "output.mp3";

  await ffmpeg.writeFile(inputName, new Uint8Array(await videoFile.arrayBuffer()));

  await ffmpeg.exec([
    "-i", inputName,
    "-vn",
    "-ar", "44100",
    "-ac", "2",
    "-b:a", bitrate,
    outputName
  ]);

  const data = await ffmpeg.readFile(outputName);
  await ffmpeg.deleteFile(inputName);
  await ffmpeg.deleteFile(outputName);

  return new Blob([data], { type: "audio/mpeg" });
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
}
