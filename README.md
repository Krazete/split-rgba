# RGBA Splitter

Splits an image into its red, green, blue, and alpha channels.

![screenshot](ss.png)

The results are displayed as HTML img elements, making them easy to save if needed.

Animated images are accepted as input, but only the first frame is shown in output.

DDS files are also accepted as input, but output is erroneous for a large portion of these files. (Because I wrote this website to analyze Ninja Ripper files, so a simple mipmap reader is all I needed. The other DDS formats seem too complicated, so no support for them.)
