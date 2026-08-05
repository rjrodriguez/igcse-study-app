import { ChapterData } from "./types";

// Sample media URLs for demonstration
const sampleAudioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const sampleVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";
const samplePdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

export const chapters: ChapterData[] = [
  {
    id: 1,
    title: "Chapter 1",
    description: "Learn the basics of JavaScript programming language",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 2,
    title: "Chapter 2",
    description: "Master HTML structure and semantic elements",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 3,
    title: "Chapter 3",
    description: "Learn CSS fundamentals and layout techniques",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 4,
    title: "Chapter 4",
    description: "Build interactive UIs with React library",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 5,
    title: "Chapter 5",
    description: "Type-safe JavaScript development with TypeScript",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 6,
    title: "Chapter 6",
    description: "Server-side JavaScript with Node.js",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 7,
    title: "Chapter 7",
    description: "Learn SQL and NoSQL database fundamentals",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 8,
    title: "Chapter 8",
    description: "Make your web apps accessible to everyone",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 9,
    title: "Chapter 9",
    description: "Optimize web apps for speed and responsiveness",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 10,
    title: "Chapter 10",
    description: "Build installable web apps with offline capabilities",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  }
];

export type { ChapterData };