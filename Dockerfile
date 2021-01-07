FROM node:14.8

# Build args for configuring the built client
ARG API_URL=https://vh7.uk

# Copy build args to environement variables so they are applied on the server
ENV API_URL=${API_URL}

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
