import { Providers } from '@/providers/Providers'
import { getAddressLabels } from '@/utils/addressLabels';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 预加载标签数据
  await getAddressLabels();
  
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
