import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";

export const metadata = {
  title: "HireVia",
  description: "Job listing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
