/**
 * Image assets used on the site.
 *
 * Right now they still point at the Framer CDN so the site works immediately.
 * Run `npm run fetch-assets` once to download them into /public/images and
 * rewrite this file to local paths — after that the site no longer depends on Framer.
 */
const framer = (id: string) => `https://framerusercontent.com/images/${id}`;

export const assets = {
  avatar: framer('YnNSfM1r1JWil8vK8eLVZtcKI.png'),
  bits: framer('qnq6M0UeooWq9Ork5mdSvDXdAI.png'),
  iconLinkedin: framer('c9YATxeBCJnK8If9RNJcH1uVvY.png'),

  logoMotorola: framer('IawxqTDa7B1l1q6rbS1nhpZ4.png'),
  logoFoundation: framer('Fr51rihs4pmiQ4W9teP2Wc6thk.png'),
  logoAgh: framer('xbUbcaK7qThuppqefUUXYN3UDA.png'),

  laurelLeft: framer('RXwO4OItWplgSohjNASN46KDyRw.png'),
  laurelRight: framer('rMkwMCmi5rDoD0lJJnKUAZVI.png'),

  // Mountain Guide screens, in the order they appear while scrolling
  mgMain: framer('eT9HThqmYe8gOv0QXzbG88q22Ac.png'),
  mgLearning: framer('tnpW05vqvLH2R3VayPhLpIbPyyo.png'),
  mgIsResponding: framer('3EPtet23XmnuDUb9INJJln9HFY.png'),
  mgSafetyCheck: framer('MGLSVfq488LnpHoi8YL3qbFGUTg.png'),
  mgCallingHelp: framer('PrsdbE4gBznzf5qZUFIOwZtRzFI.png'),
  mgCpr: framer('3SHnCIfzPA0Tm0lTlrKoT8gxo.png'),
  mgCprCamera: framer('WpsRAVn0BUzpc8Wf5YRaVQnol4.png'),
  mgAiChat: framer('DXbRSDTsXO75WQXU4TqVrgV4wU.png'),

  testExecuteScreen: framer('ZK9aywMk7EllNrTRIDTzE7WWU.png'),
  laptopBase: framer('AqYzru1Ps6EzqNNYRV9us7j9HnE.png'),

  // Photo strip under the hero
  photo01: framer('hhkgs0eu27jGNgvXRlKomZ80u90.jpeg'),
  photo02: framer('TgoC28plxOUekiMcrWvbsiqOJo.jpeg'),
  photo03: framer('YGKOdVICtxEr4aHIh3OKpDL8.jpeg'),
  photo04: framer('8kKpMLsBYLnJ6XG0VCssIDy7u8.jpeg'),
  photo05: framer('3wZ10Trk9bLJEhtpseYYKERpn4.jpeg'),
  photo06: framer('q1z8KxY2rLQ6qQxyS39ZW2mKYu0.jpeg'),
} as const;

export type AssetKey = keyof typeof assets;
