FROM node:14.8

ARG API_URL=https://vh7.uk

# RUN if [ ! -f .env ]; then \
#     echo "Generating .env..."; \
#     echo "SERVER_URL=${SERVER_URL}" >> .env; \
#     cat .env; \
#   fi

RUN mkdir -p /app
WORKDIR /app
ADD . /app

RUN yarn install
RUN yarn build

ENV HOST 0.0.0.0
CMD ["yarn", "start"]
