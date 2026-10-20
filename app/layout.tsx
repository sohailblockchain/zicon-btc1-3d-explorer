import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'ZiCON Cloud | BTC1 3D Systems Explorer',
  description: 'Explore the conceptual BTC1 system architecture, Lightning Labs and Taproot Assets through an interactive 3D experience.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body style={{ margin: 0, background: '#080d19' }}>{children}</body></html>;
}
