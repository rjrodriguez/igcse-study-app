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
    audioUrl: "media/ch01.mp3",
    videoUrl: "https://www.youtube.com/embed/aZFtu21JFO8",
    pdfUrl: "pdfs/ch01.pdf",
    jpgUrl: "jpgs/ch01.jpg",
  },
  {
    id: 2,
    title: "Chapter 2",
    description: "Input and output Devices",
    audioUrl: "media/ch02.mp3",
    videoUrl: "https://www.youtube.com/embed/lp4vbok-FlI",
    pdfUrl: "pdfs/ch02.pdf",
    jpgUrl: "jpgs/ch02.jpg",
  },
  {
    id: 3,
    title: "Chapter 3",
    description: "Storage Devices and Media",
    audioUrl: "media/ch03.mp3",
    videoUrl: "https://www.youtube.com/embed/6dFe93GOF9M",
    pdfUrl: "pdfs/ch03.pdf",
    jpgUrl: "jpgs/ch03.jpg",
  },
  {
    id: 4,
    title: "Chapter 4",
    description: "Networks",
    audioUrl: "media/ch04.mp3",
    videoUrl: "https://www.youtube.com/embed/iZ6Fm2QWN_k",
    pdfUrl: "pdfs/ch04.pdf",
    jpgUrl: "jpgs/ch04.jpg",
  },
  {
    id: 5,
    title: "Chapter 5",
    description: "Effects of Using IT",
    audioUrl: "media/ch05.mp3",
    videoUrl: "https://www.youtube.com/embed/5fzKoVdm73k",
    pdfUrl: "pdfs/ch05.pdf",
    jpgUrl: "jpgs/ch05.jpg",
  },
  {
    id: 6,
    title: "Chapter 6",
    description: "ICT Applications",
    audioUrl: "media/ch06.mp3",
    videoUrl: "https://www.youtube.com/embed/ra3xGyK5ROc",
    pdfUrl: "pdfs/ch06.pdf",
    jpgUrl: "jpgs/ch06.jpg",
  },
  {
    id: 7,
    title: "Chapter 7",
    description: "System Life Cycles",
    audioUrl: "media/ch07.mp3",
    videoUrl: "https://www.youtube.com/embed/onVLLtDOAH4",
    pdfUrl: "pdfs/ch07.pdf",
    jpgUrl: "jpgs/ch07.jpg",
  },
  {
    id: 8,
    title: "Chapter 8",
    description: "Safety and Security",
    audioUrl: "media/ch08.mp3",
    videoUrl: "https://www.youtube.com/embed/pPQldIrgoBU",
    pdfUrl: "pdfs/ch08.pdf",
    jpgUrl: "jpgs/ch08.jpg",
  },
  {
    id: 9,
    title: "Chapter 9",
    description: "Audiences",
    audioUrl: "media/ch09.mp3",
    videoUrl: "https://www.youtube.com/embed/cnekImVPB4U",
    pdfUrl: "pdfs/ch09.pdf",
    jpgUrl: "jpgs/ch09.jpg",
  },
  {
    id: 10,
    title: "Chapter 10",
    description: "Communication",
    audioUrl: "media/ch10.mp3",
    videoUrl: "https://www.youtube.com/embed/tKQgmKR6Y5Q",
    pdfUrl: "pdfs/ch10.pdf",
    jpgUrl: "jpgs/ch10.jpg",
  }
];

export type { ChapterData };