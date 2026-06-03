export const metadata = {
  title: 'Takograf',
  description: 'Next.js Takograf Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
