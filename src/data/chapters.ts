import { ChapterData } from "./types";

// Sample media URLs for demonstration
const sampleAudioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const sampleVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";
const samplePdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

export const chapters: ChapterData[] = [
  {
    id: 1,
    title: "Chapter 1",
    description: "Types and Components",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 2,
    title: "Chapter 2",
    description: "Input and output Devices",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 3,
    title: "Chapter 3",
    description: "Storage Devices and Media",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 4,
    title: "Chapter 4",
    description: "Networks",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 5,
    title: "Chapter 5",
    description: "Effects of Using IT",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 6,
    title: "Chapter 6",
    description: "ICT Applications",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 7,
    title: "Chapter 7",
    description: "System Life Cycles",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 8,
    title: "Chapter 8",
    description: "Safety and Security",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 9,
    title: "Chapter 9",
    description: "Audiences",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 10,
    title: "Chapter 10",
    description: "Communication",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  }
];

export type { ChapterData };