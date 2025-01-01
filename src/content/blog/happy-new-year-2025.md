---
slug: happy-new-year-2025
title: 2025新年快乐！
description: 新的一年，请多多关照！大家要天天开心！
cover: /assets/img/blogs/happy-new-year-2025/cover.webp
author:
  name: Jasonzyt
  avatar: /assets/img/avatar.jpg
tags: ["newyear"]
category: Misc
pinned: 0
created: 2024-12-31T16:00:00.000Z
updated: 2024-12-31T16:00:00.000Z
---

新年快乐！

诡计多端的~烧 0~ Jason 把红包藏到哪里了呢？
Tips: 真的很简单，瞎试都能试出来好吗（

## 0x0

```cpp {1-2,6,8-9,12,15-17,19}
#include <fstream>
#include <iostream>
#include <string>

#define Happy std::cout
#define Year std::endl
#define HappyEveryDay std::ios::in
#define Enjoy main
using New = std::fstream;
using Map = std::string;

int Enjoy() {
  Map bye2024;
  New _2024("/happy.py", HappyEveryDay);
  std::getline(_2024, bye2024);
  Happy << bye2024 << Year;
  _2024.close();
  return 0;
}
```

## 0x1

```python [happy.py]
import requests
import time

response = requests.get(f"http://hny.jasonz.yt/{int(time.time())}")
print(response.text)
```

## 0x2

```python
from flask import (
  Flask,
  redirect,
)
import time

app = Flask(__name__)

@app.route("/<time>", methods=["GET"])
def redpacket(time):
  try:
    if int(time) == int(time.time()):
      return redirect("https://jasonz.yt/flag.happyneryear.txt", code=302)
  finally:
    return "Forbidden", 403

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=2025)
```

~杂鱼~看懂了吗？看不懂的话就拿不到红包咯~~~
