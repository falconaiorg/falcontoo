import { Roboto_Slab, Noto_Serif, Roboto, Open_Sans } from "next/font/google";
import localFont from "next/font/local";

const openDyslexic = localFont({
  src: "./fonts/OpenDyslexic-Regular.woff2",
  weight: "400",
  preload: true,
  variable: "--font-open-dyslexic",
});

const futuraBook = localFont({
  src: "./fonts/futura-book.woff2",
  weight: "400",
  preload: true,
  variable: "--font-futura",
});

const georgia = localFont({
  src: "./fonts/georgia.woff2",
  weight: "400",
  preload: true,
  variable: "--font-georgia",
});

const helvetica = localFont({
  src: "./fonts/helvetica.woff2",
  weight: "400",
  preload: true,
  variable: "--font-helvetica",
});

const palatino = localFont({
  src: "./fonts/palatino-LT-roman.woff2",
  weight: "400",
  preload: true,
  variable: "--font-palatino",
});

const robotoSlab = Roboto_Slab({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});

const notoSerif = Noto_Serif({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-noto-serif",
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto",
});

const openSans = Open_Sans({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const readerFontsObject = {
  RobotoSlab: robotoSlab,
  NotoSerif: notoSerif,
  Roboto: roboto,
  OpenSans: openSans,
  Georgia: georgia,
  Palatino: palatino,
  Helvetica: helvetica,
  FuturaBook: futuraBook,
  OpenDyslexic: openDyslexic,
};

export const readerFonts = [
  {
    name: "Roboto",
    className: roboto.className,
    description:
      "Offers a crisp, no-nonsense look that keeps your focus squarely on the content.",
  },
  {
    name: "Roboto Slab",
    className: robotoSlab.className,
    description:
      "Blends modern flair with a hint of tradition, giving your text a confident, grounded feel.",
  },
  {
    name: "Noto Serif",
    className: notoSerif.className,
    description:
      "Brings a global, inclusive vibe to your reading with its multi-language support.",
  },
  {
    name: "Open Sans",
    className: openSans.className,
    description:
      "Delivers a friendly, approachable feel that makes even complex topics feel accessible.",
  },
  {
    name: "Georgia",
    className: georgia.className,
    description:
      "Evokes the cozy feeling of curling up with a classic paperback, right on your screen.",
  },
  {
    name: "Palatino",
    className: palatino.className,
    description:
      "Adds a touch of refined elegance, perfect for when you want your reading to feel a bit more luxurious.",
  },
  {
    name: "Helvetica",
    className: helvetica.className,
    description:
      "Brings a sleek, minimalist aesthetic that lets you focus on ideas without visual distractions.",
  },
  {
    name: "Futura Book",
    className: futuraBook.className,
    description:
      "Infuses your reading with a bold, forward-thinking vibe through its distinctive geometric shapes.",
  },
  {
    name: "Open Dyslexic",
    className: openDyslexic.className,
    description:
      "Features uniquely shaped letters to boost readability, especially helpful if you sometimes mix up characters.",
  },
];
