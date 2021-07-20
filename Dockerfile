FROM node:14.8

# Build args for configuring the built client
ARG QUARK_API_URL=https://vh7.uk
ARG QUARK_OAUTH__AUTHORIZATION=https://auth.vh7.uk/oauth2/authorize
ARG QUARK_OAUTH__TOKEN=https://auth.vh7.uk/oauth2/token
ARG QUARK_OAUTH__USER_INFO=https://auth.vh7.uk/oauth2/userinfo
ARG QUARK_OAUTH__LOGOUT=https://auth.vh7.uk/oauth2/logout
ARG QUARK_OAUTH__CLIENT_ID=7fd54664-137e-4906-b2f7-7135a9a4fe10
ARG QUARK_INSTANCE__URL=https://vh7.uk

RUN if [ ! -f .env ]; then \
    echo "Generating .env..."; \
    echo "QUARK_API_URL=${QUARK_API_URL}" >> .env; \
    echo "QUARK_OAUTH__AUTHORIZATION=${QUARK_OAUTH__AUTHORIZATION}" >> .env; \
    echo "QUARK_OAUTH__TOKEN=${QUARK_OAUTH__TOKEN}" >> .env; \
    echo "QUARK_OAUTH__USER_INFO=${QUARK_OAUTH__USER_INFO}" >> .env; \
    echo "QUARK_OAUTH__LOGOUT=${QUARK_OAUTH__LOGOUT}" >> .env; \
    echo "QUARK_OAUTH__CLIENT_ID=${QUARK_OAUTH__CLIENT_ID}" >> .env; \
    echo "QUARK_INSTANCE__URL=${QUARK_INSTANCE__URL}" >> .env; \
    cat .env; \
  fi

RUN mkdir -p /app
WORKDIR /app
ADD . /app

RUN yarn install
RUN yarn build

ENV HOST 0.0.0.0
CMD ["yarn", "start"]
