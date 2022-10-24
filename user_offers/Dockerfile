FROM ruby:latest

WORKDIR /usr/src/app

# Copy the dependencies file and install them
COPY Gemfile ./
COPY Gemfile.lock ./
RUN bundle install

# Start the rails server and bind to all IPs since binding to localhost would not make it available outside the container
CMD ["rails", "server", "-b", "0.0.0.0"]
