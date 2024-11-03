import os
import sys

if len(sys.argv) > 1:
  os.chdir(sys.argv[1])

# compress all jpegs in the current directory
for filename in os.listdir('.'):
  if filename.endswith(".jpg"):
    if not os.path.isfile(filename[:-4] + "_m.webp"):
      os.system("ffmpeg -i " + filename + " -lossless 0 " + filename[:-4] + "_m.webp")
    if not os.path.isfile(filename[:-4] + "_s.webp"):
      os.system("ffmpeg -i " + filename + " -lossless 0 -vf scale=iw/2:ih/2 " + filename[:-4] + "_s.webp")