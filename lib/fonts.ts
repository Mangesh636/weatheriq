import { Noto_Sans, Noto_Serif } from "next/font/google";

const NotoSansFont = Noto_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-noto-sans",
});

const NotoSerifFont = Noto_Serif({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-noto-serif",
})

export { NotoSansFont, NotoSerifFont };