import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DR 운영시스템 | 식스티헤르츠',
  description: '수요반응 사업 운영 관리 시스템',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
