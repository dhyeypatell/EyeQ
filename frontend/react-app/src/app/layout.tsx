import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import { ToastConfig } from "./toastConfig";
import toastConfig from "./toastConfig.json" assert { type: "json" };
import metatdataData from "./metadata.json";
import "../styles/reset.scss";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  ...metatdataData.metadata,
};

const toastConfigTyped = toastConfig as ToastConfig;

const toasterOptions = {
  position: toastConfigTyped.toast.position,
  toastOptions: {
    duration: toastConfigTyped.toast.duration,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Toaster {...toasterOptions} />
        {children}
      </body>
    </html>
  );
}
