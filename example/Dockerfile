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
# docker build -t example .
#
# # Mount current directory on container so that file can be written back to host
# # Assuming videos are on current directory
# docker run --rm -ti -v ${PWD}:/code example node video.mp4 10 30 out.mp4
# ls out.mp4
# ~~~~
# ============================================================================

# Step 1: Install any Python packages
# ----------------------------------------

RUN mkdir /code
WORKDIR /code
ADD package.json /code/
RUN npm install

# Step 2: Copy Python script
# ----------------------------------------

ADD split.js /code/

# Step 3: Configure entrypoint
# ----------------------------------------

CMD           ["-h"]
ENTRYPOINT    ["node", "split.js"]





