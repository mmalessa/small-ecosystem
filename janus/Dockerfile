FROM golang:1.21.0 AS build

RUN apt-get update && apt-get install -y git
RUN mkdir /app && cd /app && git clone https://github.com/motiv-labs/janus.git
RUN cd /app/janus && make


FROM alpine:3.18.3

COPY --from=build /app/janus/dist/janus /app/janus
WORKDIR /app