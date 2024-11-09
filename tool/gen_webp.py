import os
import sys
from PIL import Image

if len(sys.argv) > 1:
  os.chdir(sys.argv[1])

# compress all jpegs in the current directory
for filename in os.listdir('.'):
  if filename.endswith(".jpg"):
    if not os.path.isfile(filename[:-4] + "_m.webp"):
      os.system(f'ffmpeg -i "{filename}" -lossless 0 "{filename[:-4]}_m.webp"')
    if not os.path.isfile(f"{filename[:-4]}_s.webp"):
      os.system(f'ffmpeg -i "{filename}" -lossless 0 -vf scale=1200:-1 "{filename[:-4]}_s.webp"')
    if not os.path.isfile(f"{filename[:-4]}_square_s.webp"):
      img = Image.open(filename)
      w, h = img.size
      if w > h:
        img.crop(((w-h)/2, 0, (w+h)/2, h)).resize((640, 640)).save(f"{filename[:-4]}_square_s.webp", 'webp', quality=8, optimize=True)
      else:
        img.crop((0, (h-w)/2, w, (h+w)/2)).resize((640, 640)).save(f"{filename[:-4]}_square_s.webp", 'webp', quality=8, optimize=True)