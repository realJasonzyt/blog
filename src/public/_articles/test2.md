This is also a test article.

::: center
![img](/assets/img/illustrations/112981252_p0.jpg)
:::

```python
from PIL import Image
from waifu_sensor.v3 import predict

result = predict(Image.open('urusai.jpg'))
print(result)   # [('momoi (blue archive)', 1.8325137893845367), ('iijima yun', 2.4338155048445755), ('midori (blue archive)', 2.5287921933510806)]
```
