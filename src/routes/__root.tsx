import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Ahmed Fahmy — Unity · XR · Game Development',
      },
      {
        name: 'description',
        content:
          'Unity developer with 3+ years building VR training simulations and 2D/3D games. Shipped client-deployed XR products for healthcare and education.',
      },
      { property: 'og:title', content: 'Ahmed Fahmy — Unity · XR · Game Development' },
      {
        property: 'og:description',
        content:
          'Unity developer building immersive VR training and 2D/3D games — explore the projects in an interactive 3D scene.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: '/logo512.png' },
      { name: 'twitter:card', content: 'summary' },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Spline+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

// Runs before first paint so a saved dark preference never flashes light
const THEME_INIT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}})()`

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
