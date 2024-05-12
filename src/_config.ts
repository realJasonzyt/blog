const Config = {
  title: "Jasonzyt's Blog",
  avatar: 'https://avatars.githubusercontent.com/u/66063199',
  footer: `&copy;Jasonzyt&nbsp;&nbsp;${new Date().getFullYear()}`,
  Index: {
    welcome: 'HI, JASONZYT',
    quote: 'Do the right thing, wait to get fired.',
    backgrounds: [
      { path: '/assets/img/backgrounds/74922836_p0.jpg', props: ['horizontal', 'dark'] },
      { path: '/assets/img/backgrounds/100022190_p0.jpg', props: ['horizontal', 'light'] },
      { path: '/assets/img/backgrounds/112167497_p0.jpg', props: ['horizontal', 'dark'] },
      { path: '/assets/img/backgrounds/113793915_p0.jpg', props: ['horizontal', 'dark'] },
      { path: '/assets/img/backgrounds/109884134_p0.jpg', props: ['horizontal', 'light'] },
      { path: '/assets/img/backgrounds/109884134_p1.jpg', props: ['horizontal', 'dark'] },
      { path: '/assets/img/backgrounds/109884134_p2.jpg', props: ['horizontal', 'dark'] },
      { path: '/assets/img/backgrounds/104805436_p0.jpg', props: ['horizontal', 'light'] },
      { path: '/assets/img/backgrounds/118020641_p0.jpg', props: ['vertical', 'light'] },
      { path: '/assets/img/backgrounds/109453105_p0.jpg', props: ['vertical', 'light'] },
      { path: '/assets/img/backgrounds/107163970_p0.jpg', props: ['vertical', 'dark'] }
    ]
  },
  articlesBase: '/_articles/'
}

const build = (config: any = Config) => {
  for (const key in config) {
    if (typeof config[key] === 'object') {
      config[key] = build(config[key])
    } else if (typeof config[key] === 'function' && config[key].length === 0) {
      config[key] = config[key]()
    }
  }
  return config
}

export default build()
