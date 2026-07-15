import { ChapterData } from "./types";

// Sample media URLs for demonstration
const sampleAudioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const sampleVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";
const samplePdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

export const chapters: ChapterData[] = [
  {
    id: 1,
    title: "Introduction to JavaScript",
    description: "Learn the basics of JavaScript programming language",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 2,
    title: "HTML Fundamentals",
    description: "Master HTML structure and semantic elements",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 3,
    title: "CSS Styling Basics",
    description: "Learn CSS fundamentals and layout techniques",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 4,
    title: "React Essentials",
    description: "Build interactive UIs with React library",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 5,
    title: "TypeScript Fundamentals",
    description: "Type-safe JavaScript development with TypeScript",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 6,
    title: "Node.js Basics",
    description: "Server-side JavaScript with Node.js",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 7,
    title: "Database Concepts",
    description: "Learn SQL and NoSQL database fundamentals",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 8,
    title: "Web Accessibility",
    description: "Make your web apps accessible to everyone",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 9,
    title: "Performance Optimization",
    description: "Optimize web apps for speed and responsiveness",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  },
  {
    id: 10,
    title: "Progressive Web Apps",
    description: "Build installable web apps with offline capabilities",
    audioUrl: sampleAudioUrl,
    videoUrl: sampleVideoUrl,
    pdfUrl: samplePdfUrl,
  }
];

export type { ChapterData };