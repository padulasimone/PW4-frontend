// app/layout.js
import "./globals.css";
import MainHeader from "@/components/main-header";
import Footer from "@/components/footer";

export default function RootLayout({ children }) {
    return (
        <html lang="it">
            <head>
                <title>C'est La Vie</title>
                <meta name="description" content="Pasticceria Varese C'est La Vie" />
                
                {/* Link a Font Awesome */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                />
                
                {/* Link alla favicon */}
                <link rel="icon" href="/immagini/logo_v2.png" type="image/png" />
            </head>
            <body>
                <MainHeader />
                {children}
                <Footer />
            </body>
        </html>
    );
}
