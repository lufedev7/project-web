import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        banner: "url('/assets/banner.jpg')",
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        LightBlue: '#e8f2fd',
        LightBlueHover: '#ddecfb',
        LightBlueActive: '#b8d7f7',
        NormalBlue: '#197fe6',
        NormalBlueHover: '#1772cf',
        NarmalBlueActive: '#1466b8',
        DarkBlue: '#135fad',
        DarkBlueHover: '#0f4c84',
        DarkBlueActive: '#0b3967',
        DarkerBlue: '#092c51',
        NormalLightHover: '#e6e6e6',
        NormalLightActive: '#cccccc',
        DarkLight: '#bfbfbf',
        DarkLightHover: '#999999',
        DarkLightActive: '#737373',
        DarkerLight: '#595959',
      },
      screens: {
        mdmobile: '354px',
        bm: '514px',
        mobileg: '652px',

        // => @media (min-width: 450px) { ... }
      },
    },
  },
  plugins: [],
}
export default config
