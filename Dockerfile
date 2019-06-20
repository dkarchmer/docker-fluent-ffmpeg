FROM ampervue/ffmpeg

# https://github.com/ampervue/docker-fluent-ffmpeg
# https://hub.docker.com/r/dkarchmervue/fluent-ffmpeg/


MAINTAINER David Karchmer <dkarchmer@ampervue.com>

#####################################################################
#
# A Docker image with everything needed to run Moviepy scripts
# 
# Image based on ampervue/ffmpeg (Ubuntu 14.04)
#
#   with
#     - Latest Python 3.4
#     - Latest FFMPEG (built)
#     - NodeJS
#     - fluent-ffmpeg
#
#   For more on Fluent-FFMPEG, see 
#
#            https://github.com/fluent-ffmpeg/node-fluent-ffmpeg
#
#   plus a bunch of build/web essentials
#
#####################################################################

# Add the following two dependencies for nodejs
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
RUN apt-get update -qq && apt-get install -y --force-yes \
    nodejs; \
    apt-get clean

WORKDIR /usr/local/src

# Custom Builds go here
RUN npm install -g fluent-ffmpeg

# Remove all tmpfile and cleanup
# =================================
WORKDIR /usr/local/
RUN rm -rf /usr/local/src
RUN apt-get autoremove -y; apt-get clean -y
# =================================

# Setup a working directory to allow for
# docker run --rm -ti -v ${PWD}:/work ...
# =======================================
WORKDIR /work

