
A Docker image running Ubuntu:trusty with latest Python 3.5, latest FFMPEG (built from source)
and latest NodeJS 4.X

For more on Fluent-FFMPEG, see 

            https://github.com/fluent-ffmpeg/node-fluent-ffmpeg

Many thanks to all the contributors of that great project.

### To Build

~~~~
docker build -t <imageName> .
~~~~

### To pull and run from hub.docker.com

Docker Hub: https://registry.hub.docker.com/u/dkarchmervue/fluent-ffmpeg/

Source and example: https://github.com/ampervue/docker-fluent-ffmpeg

~~~~
docker pull dkarchmervue/fluent-ffmpeg
docker run --rm -ti dkarchmervue/fluent-ffmpeg ffmpeg -version
docker run --rm -ti -v ${PWD}:/work dkarchmervue/fluent-ffmpeg ffmpeg video.mp4 ...
docker run --rm -ti -v ${PWD}:/work dkarchmervue/fluent-ffmpeg python your-python-script.py
docker run --rm -ti -v ${PWD}:/work dkarchmervue/fluent-ffmpeg node your-nodejs-script.py
docker run --rm -ti dkarchmervue/fluent-ffmpeg bash
~~~~

## Example

As an example, the nodeJS script using fluent-ffmpeg
to split a video

~~~~
# Pull image
docker pull dkarchmervue/moviepy

# Get example files and build new image
git clone https://github.com/ampervue/docker-ffmpeg-moviepy
cd example
docker build -t split .

# Mount current directory on container so that file can be written back to host
# Assuming videos are on current directory
docker run --rm -ti -v ${PWD}:/code split node video.mp4 10 30 out.mp4
ls out.mp4
~~~~