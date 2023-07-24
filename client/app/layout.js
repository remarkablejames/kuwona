import './globals.css'
import { Inter } from 'next/font/google'
import LayoutShell from "@/app/shell";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kuwona Idea Board',
  description: 'A simple idea board where you can post your ideas and vote on others.',
}

export default function RootLayout({ children }) {
  return (
    <LayoutShell children={children} />

  )
}
