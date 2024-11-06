// app/layout.js
import "./globals.css";
import Head from "next/head";

import MainHeader from "@/components/main-header";
import Footer from "@/components/footer";

export const metadata = {
  title: "Login & Signup Form",
  description: "Pagina di Login e Registrazione",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <Head>
        {/* Link a Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
      </Head>
      <body>
        <MainHeader></MainHeader>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
