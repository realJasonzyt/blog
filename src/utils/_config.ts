const Config = {
  title: "Jasonzyt's Blog",
  avatar: "/assets/img/avatar.jpg",
  footer: {
    copyright: `&copy;Jasonzyt&nbsp;&nbsp;${new Date().getFullYear()}`,
  },
  articlesBase: "/_articles/",
  apiBase: "/api",
  api: {
    articles: {
      stats: {
        enable: false,
        endpoint: "/articles/stats",
      },
    },
  },
  Index: {
    welcome: "HI, JASONZYT",
    quote: "Do the right thing, wait to get fired.",
    backgrounds: [
      {
        path: "/assets/img/backgrounds/74922836_p0.jpg",
        props: ["horizontal", "dark"],
      },
      {
        path: "/assets/img/backgrounds/100022190_p0.jpg",
        props: ["horizontal", "light"],
      },
      {
        path: "/assets/img/backgrounds/112167497_p0.jpg",
        props: ["horizontal", "dark"],
      },
      {
        path: "/assets/img/backgrounds/113793915_p0.jpg",
        props: ["horizontal", "dark"],
      },
      {
        path: "/assets/img/backgrounds/109884134_p0.jpg",
        props: ["horizontal", "light"],
      },
      {
        path: "/assets/img/backgrounds/109884134_p1.jpg",
        props: ["horizontal", "dark"],
      },
      {
        path: "/assets/img/backgrounds/109884134_p2.jpg",
        props: ["horizontal", "dark"],
      },
      {
        path: "/assets/img/backgrounds/104805436_p0.jpg",
        props: ["horizontal", "light"],
      },
      {
        path: "/assets/img/backgrounds/118020641_p0.jpg",
        props: ["vertical", "light"],
      },
      {
        path: "/assets/img/backgrounds/109453105_p0.jpg",
        props: ["vertical", "light"],
      },
      {
        path: "/assets/img/backgrounds/107163970_p0.jpg",
        props: ["vertical", "dark"],
      },
      {
        path: "/assets/img/backgrounds/73492598_p0.jpg",
        props: ["horizontal", "light"],
      },
      {
        path: "/assets/img/backgrounds/77353796_p0.jpg",
        props: ["horizontal", "light"],
      },
      {
        path: "/assets/img/backgrounds/104185807_p0.jpg",
        props: ["horizontal", "light"],
      },
      {
        path: "/assets/img/backgrounds/72114086_p0.jpg",
        props: ["horizontal", "light"],
      },
      {
        path: "/assets/img/backgrounds/109307377_p0.jpg",
        props: ["vertical", "dark"],
      },
      {
        path: "/assets/img/backgrounds/visual9.jpg",
        props: ["vertical", "light"],
      },
      {
        path: "/assets/img/backgrounds/wall09.jpg",
        props: ["vertical", "light"],
      },
      {
        path: "/assets/img/backgrounds/wall22.jpg",
        props: ["vertical", "light"],
      },
    ],
  },
};

const build = (config: any = Config) => {
  for (const key in config) {
    if (typeof config[key] === "object") {
      config[key] = build(config[key]);
    } else if (typeof config[key] === "function" && config[key].length === 0) {
      config[key] = config[key]();
    }
  }
  return config;
};

export default build();
