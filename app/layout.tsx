import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://leerob.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Lee Robinson",
    template: "%s | Lee Robinson",
  },
  description: "Frontend developer, optimist, community builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main className="prose prose-headings:text-balance prose-blockquote:text-muted-foreground prose-blockquote:[quotes:none] prose-code:text-nowrap prose-code:rounded-lg prose-code:bg-primary prose-code:text-primary-foreground prose-code:px-2 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none prose-pre:p-2 prose-pre:my-0 prose-pre:bg-[#24292e] mx-auto w-full max-w-4xl px-3">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  const links = [
    { name: "@leerob", url: "https://x.com/leerob" },
    { name: "youtube", url: "https://www.youtube.com/@leerob" },
    { name: "linkedin", url: "https://www.linkedin.com/in/leeerob" },
    { name: "github", url: "https://github.com/leerob" },
  ];

  return (
    <footer className="mt-12 text-center">
      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-colors duration-200 hover:text-blue-500 dark:text-gray-500"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}
