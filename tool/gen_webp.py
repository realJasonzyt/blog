import os

# compress all jpegs in the current directory
for filename in os.listdir("."):
    if filename.endswith(".jpg"):
        os.system("ffmpeg -i " + filename + " -lossless 0 " + filename[:-4] + "_m.webp")
        os.system("ffmpeg -i " + filename + " -lossless 0 -vf scale=iw/2:ih/2 " + filename[:-4] + "_s.webp")