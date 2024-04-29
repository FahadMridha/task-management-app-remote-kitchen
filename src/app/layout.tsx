import Providers from "@/lib/Provider";
import "./globals.css";
import { getServerSession } from "next-auth";
import Navbar from "@/components/shared/Navbar";
import { authOptions } from "@/utils/authOptions";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Simple Task Management ",
  description: "simple Task Management app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <Providers>
      <html lang='en'>
      <body>
      <Navbar session={session ? true : false}/>
      <Toaster position="top-center" />
      {children}
      </body>
    </html>
    </Providers>
  );
}
