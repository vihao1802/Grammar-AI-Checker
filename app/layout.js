import "./globals.css";

export const metadata = {
  title: "Grammer AI Checker",
  description:
    "This is a simple web app that uses theChatGPT APIto check grammar of a given text.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
