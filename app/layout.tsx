import './globals.css';

export const metadata = {
  title: 'Novas Creative - Thiết kế Slide & Giáo án điện tử',
  description: 'Ý tưởng học đường, trình chiếu có chất.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-[#10131B] text-[#F3F0E8] antialiased">{children}</body>
    </html>
  );
}
