FROM dkarchmervue/fluent-ffmpeg

# https://github.com/ampervue/docker-fluent-ffmpeg
# https://hub.docker.com/r/dkarchmervue/fluent-ffmpeg/

MAINTAINER David Karchmer <dkarchmer@gmail.com>

# ============================================================================
# As an example, runs a script to split a video
#
# ~~~~
# # Pull image
# docker pull dkarchmervue/fluent-ffmpeg
#
# # Get example files and build new image
# git clone https://github.com/ampervue/docker-fluent-ffmpeg
# cd example
# docker build -t split .
#
# # Mount current directory on container so that file can be written back to host
# # Assuming videos are on current directory
# cd to/directory/with/videos
# docker run --rm -ti -v ${PWD}:/videos split /videos/c1.mp4 5 10 /videos/out.mp4
# ls out.mp4
# ~~~~
# ============================================================================

# Step 1: Install any Python packages
# ----------------------------------------

RUN mkdir /code
WORKDIR /code
ADD package.json /code/package.json
RUN npm install

# Step 2: Copy Python script
# ----------------------------------------

ADD split.js /code/split.js

# Step 3: Configure entrypoint
# ----------------------------------------

CMD           ["-h"]
ENTRYPOINT    ["node", "split.js"]





