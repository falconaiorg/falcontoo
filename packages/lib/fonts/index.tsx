import {
  Crimson_Pro,
  Inter,
  Lora,
  Playfair_Display,
  Cardo,
} from "next/font/google";

const inter = Inter({
  weight: "variable",
  subsets: ["latin"],
});

const lora = Lora({
  weight: "variable",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  weight: "variable",
  subsets: ["latin"],
});

const crimsonPro = Crimson_Pro({
  weight: "variable",
  subsets: ["latin"],
});

const cardo = Cardo({
  weight: ["400", "700"],
  subsets: ["latin"],
});
export const fonts = {
  sans: {
    inter: inter.className,
  },
  serif: {
    lora: lora.className,
    playfair: playfairDisplay.className,
    cardo: cardo.className,
    crimsonPro: crimsonPro.className,
  },
};
