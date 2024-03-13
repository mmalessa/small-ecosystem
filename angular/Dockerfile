FROM node:20.11.1-alpine3.19
ENV TZ=Europe/Warsaw
RUN npm install -g @angular/cli@17.2.3
RUN apk update && apk add bash git sudo

#ARG APP_USER_ID
#ARG APP_GROUP_ID
ARG APP_USER_NAME=node
# RUN adduser -s /bin/bash -u $APP_USER_ID -D $APP_USER_NAME
RUN echo "$APP_USER_NAME ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/$APP_USER_NAME \
    && chmod 0440 /etc/sudoers.d/$APP_USER_NAME

USER $APP_USER_NAME
WORKDIR /app
