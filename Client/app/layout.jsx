import "./globals.css";

export const metadata = {
  title: "DK Chatbot",
  description: "Next.js chat UI powered by your backend API.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
