// /app/layout.tsx
import Navbar from "./components/Navbar";
import "./styles/globals.css";
export const metadata = {
  title: "Fake Store",
  description: "A simple e-commerce store using FakeStore API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
