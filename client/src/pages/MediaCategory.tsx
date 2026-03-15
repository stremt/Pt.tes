import { useSEO, StructuredData } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Video, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Link } from "wouter";

export default function MediaCategory() {
  useSEO({
    title: "Media Tools – Free Audio & Video Converter | Pixocraft",
    description: "Convert and edit audio and video files instantly with Pixocraft's free media tools. Compress videos, convert audio formats, trim MP3s, convert GIFs—all offline and private.",
    keywords: "media tools, video converter, audio converter, gif maker, video compressor, audio trimmer, mp3 converter, free media tools, online media tools",
    canonicalUrl: "https://tools.pixocraft.in/tools/media",
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://tools.pixocraft.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://tools.pixocraft.in/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Media Tools",
        "item": "https://tools.pixocraft.in/tools/media"
      }
    ]
  };

  const mediaTools = [
    { id: "video-to-gif", name: "Video to GIF", description: "Convert video files to animated GIFs with custom frame selection and quality control.", path: "/tools/video-to-gif" },
    { id: "gif-to-mp4", name: "GIF to MP4", description: "Convert animated GIFs to MP4 video format for smaller file sizes and better compatibility.", path: "/tools/gif-to-mp4" },
    { id: "gif-compressor", name: "GIF Compressor", description: "Compress GIF files while maintaining animation quality and smoothness instantly.", path: "/tools/gif-compressor" },
    { id: "video-compressor", name: "Video Compressor", description: "Compress video files to reduce size while maintaining visual quality and clarity.", path: "/tools/video-compressor" },
    { id: "mp3-cutter", name: "MP3 Cutter", description: "Cut and trim MP3 audio files online with precise frame-level accuracy control.", path: "/tools/mp3-cutter" },
    { id: "mp4-to-mp3", name: "MP4 to MP3 Converter", description: "Extract audio from MP4 videos and convert to MP3 format quickly and easily.", path: "/tools/mp4-to-mp3" },
    { id: "audio-noise-remover", name: "Audio Noise Remover", description: "Remove background noise and clean up audio recordings with one click processing.", path: "/tools/audio-noise-remover" },
  ];

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Media Tools", url: "/tools/media" },
          ]}
        />

        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-3">
            <Video className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-base px-6 py-2 font-semibold" data-testid="badge-media-category">
              Media Tools
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Media Tools – Free, Private & Offline
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Convert, compress, and edit audio and video files instantly without downloads or uploads
          </p>
          <div className="pt-4">
            <Link href="/tools">
              <Button variant="outline" data-testid="button-browse-all-tools">
                Browse All Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-invert max-w-none space-y-8 mb-16">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Process Audio and Video Instantly</h2>
            <p className="text-muted-foreground leading-relaxed">
              Media tools help you convert, compress, and edit audio and video files directly in your browser. Whether you need to convert video to GIF, trim MP3 files, compress videos, or extract audio from videos, media tools eliminate the need for complex software installations. From converting formats to removing background noise, media tools handle multimedia tasks in seconds.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Modern media tools provide everything from basic operations like format conversion to advanced features like noise removal and compression, all accessible through your browser without any software downloads.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Who Benefits from Media Tools?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Content creators use media tools to convert videos to GIFs for social media, compress large video files for upload, and clean up podcast audio. Developers leverage video-to-GIF and audio converters for web projects. Podcasters trim and edit audio tracks. Students compress videos for presentations and assignments. Businesses optimize media files for website performance. Musicians and sound engineers remove background noise from recordings.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Privacy-conscious users appreciate local processing that keeps media on their device. Quick online workers save time with one-click operations that eliminate software overhead and learning curves.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Common Media Tasks</h2>
            <p className="text-muted-foreground leading-relaxed">
              Video compression reduces file sizes for faster uploads and sharing while maintaining visual quality. Format conversion changes between MP4, GIF, MP3, and other popular formats. GIF creation turns videos into animated GIFs for social media sharing. Audio extraction pulls sound from videos. Noise removal cleans up recordings by eliminating background distractions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Audio trimming cuts precise segments from songs or voice recordings. Format conversion changes between WAV, OGG, AAC, M4A, and MP3. Bitrate adjustment optimizes audio quality and file size balance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Private & Offline Media Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              All media tools run entirely in your browser—no uploads to external servers. This offline-first approach ensures complete privacy for personal videos, voice recordings, music files, and proprietary audio. No tracking, no logging, no third-party analysis. Your media stays on your device throughout the entire process.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Local media processing means instant results without network delays, offline functionality after initial load, and zero security risks. Whether processing confidential recordings, personal videos, or sensitive audio, browser-based processing guarantees genuine privacy and security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Using Media Tools Effectively</h2>
            <p className="text-muted-foreground leading-relaxed">
              Start with compression to reduce file sizes without quality loss. Use format conversion to ensure compatibility across different devices and platforms. Convert videos to GIFs for social media sharing. Extract audio from videos to repurpose content. Trim audio files to remove unwanted segments. Remove background noise to improve recording quality. All operations complete instantly without waiting for uploads or processing on remote servers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">No Sign-Up, No Tracking, No Data Collection</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft media tools work completely free without requiring account creation or personal information. No signup forms, no login requirements, no email verification. Start using tools immediately by simply visiting the website. Your privacy is respected—no user tracking, no analytics that compromise privacy, no data collection beyond what's necessary for the tool to function. Process unlimited media files with complete peace of mind knowing your files and activities remain completely private.
            </p>
          </section>
        </article>

        {/* Tools Grid */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">Available Media Tools</h2>
            <p className="text-muted-foreground">
              All tools work offline in your browser. No installation required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mediaTools.map((tool) => (
              <Card key={tool.id} className="flex flex-col hover-elevate transition-all duration-200 group" data-testid={`card-tool-${tool.id}`}>
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {tool.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <CardDescription className="text-muted-foreground leading-relaxed mb-4 flex-1">
                    {tool.description}
                  </CardDescription>
                  <a href={tool.path}>
                    <Button className="w-full" data-testid={`button-use-${tool.id}`}>
                      Use Tool
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
    </>
  );
}
