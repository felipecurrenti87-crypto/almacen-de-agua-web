import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Almacén de Agua | Agua purificada en Mendoza",
    template: "%s | Almacén de Agua",
  },
  description:
    "Venta de agua purificada, soda y dispensers con entrega a domicilio en toda la provincia de Mendoza. Bidones de 12 y 20 litros, soda Puragua y dispensers Bacope.",
  keywords: [
    "agua purificada",
    "bidones de agua",
    "soda",
    "dispenser",
    "Mendoza",
    "Godoy Cruz",
    "Puragua",
    "agua a domicilio",
    "envío de agua",
  ],
  authors: [{ name: "Almacén de Agua" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Almacén de Agua",
    title: "Almacén de Agua | Agua purificada en Mendoza",
    description:
      "Agua purificada Puragua con entrega a domicilio en toda la provincia de Mendoza.",
  },
  robots: { index: true, follow: true },
  other: {
    "geo.region": "AR-M",
    "geo.placename": "Godoy Cruz, Mendoza",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakarta.variable} ${inter.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Almacén de Agua",
              description:
                "Venta de agua purificada, soda y dispensers en Mendoza",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Beltrán Sur 423",
                addressLocality: "Godoy Cruz",
                addressRegion: "Mendoza",
                addressCountry: "AR",
              },
              telephone: "+54-261-422-6402",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "19:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "13:00",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.1",
                reviewCount: "45",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <CartProvider>
          <SmoothScroll>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Cart />
            <WhatsAppButton />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
