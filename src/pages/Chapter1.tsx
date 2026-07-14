import Chapter from '../components/Chapter';

export default function Chapter1() {
  return (
    <Chapter
      chapterNumber={1}
      title="Introduction to Study Methods"
      audioUrl="https://example.com/audio/chapter1.mp3"
      videoUrl="https://example.com/video/chapter1.mp4"
      pdfUrl="https://example.com/pdf/chapter1.pdf"
    />
  );
}