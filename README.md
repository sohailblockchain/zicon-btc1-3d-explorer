# ZiCON Cloud — BTC1 Interactive 3D Explorer

An interactive 3D-style architecture visualization of the proposed BTC1 dashboard, Taproot Assets and Lightning Labs stack. Built with Next.js 15 and a self-contained HTML5 Canvas explorer. Ready for GitHub and Vercel.

> **Prototype only:** No real wallet connections, Taproot Asset transfers, swaps, Lightning node calls, or funds are connected. Swap21 integration and BTC1 asset protocol details remain unverified.

## Live interface

Explore the scene using drag-to-rotate, scroll-to-zoom, inspectable technical services, architecture layer filters, and animated conceptual payment flows. The technical inspector links to official Lightning Labs documentation.

## Deploy to Vercel

1. Create a GitHub repository and push **the contents of this folder to the root** (not the parent folder).
2. Go to <https://vercel.com/new> and choose **Import Git Repository**.
3. Select this repository; Vercel should automatically detect **Next.js**.
4. Leave **Root Directory** as `./`, **Build Command** as `next build` (default), and **Output Directory** as framework default.
5. Click **Deploy**. No environment variables are required for this demo.
6. Open the Vercel URL to test zoom/rotate, component inspection and the animated scenarios.

**GitHub connection:** A private GitHub repository works with Vercel if the Vercel GitHub integration has permission to access it. If Vercel doesn't show the repo, adjust GitHub app permissions for Vercel.

## Local development

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

For a production build:

```bash
npm run build
npm run start
```

## Project structure

```text
app/
  layout.tsx              # Metadata and document shell
  page.tsx                # Full viewport architecture page
public/
  explorer.html           # Complete interactive application, 100% client-side
  favicon.svg             # ZiCON icon
package.json
next.config.ts
tsconfig.json
next-env.d.ts
.gitignore
README.md
ARCHITECTURE_NOTES.md
```

You can also open `public/explorer.html` directly in a browser to view the interactive demo without Next.js.

## Architecture boundaries and security

- `lnd`: Lightning channels, invoices and payments.
- `tapd`: Taproot Assets minting, verification and transfers.
- `litd`: integrated Lightning Terminal orchestration.
- Taproot Asset Lightning routing may require RFQ and edge liquidity.
- MetaMask EVM or Bitcoin account connectivity alone is **not** a native Lightning/Taproot Assets wallet connection.
- Swap21: proposed adapter pending documentation and approval.
- No server-side wallet keys or credentials are embedded in this application.

## Official documentation

- <https://docs.lightning.engineering/lightning-network-tools/lightning-terminal/integrating-litd>
- <https://docs.lightning.engineering/lightning-network-tools/taproot-assets/get-tapd>
- <https://docs.lightning.engineering/lightning-network-tools/taproot-assets/taproot-assets-channels>
- <https://docs.lightning.engineering/lightning-network-tools/taproot-assets/rfq>
- <https://docs.lightning.engineering/lightning-network-tools/lnd/macaroons>

**Recommended next phase:** Replace conceptual Canvas rendering with WebGL/Three.js for higher fidelity, connect to an authenticated API gateway, and test Lightning/Taproot Asset workflows on test networks before any mainnet deployment.