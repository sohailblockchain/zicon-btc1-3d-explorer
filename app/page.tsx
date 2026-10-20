export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100dvh', minHeight: '100vh', background: '#080d19', overflow: 'hidden' }}>
      <iframe
        title="ZiCON BTC1 Interactive 3D Architecture"
        src="/explorer.html"
        style={{ display: 'block', width: '100%', height: '100%', border: 0 }}
        loading="eager"
        allow="fullscreen"
      />
    </main>
  );
}
