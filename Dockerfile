FROM ruby:2.3.1
RUN apt-get update -qq && apt-get install -y build-essential nodejs
RUN mkdir /myapp

ENV RAILS_ENV=production
ENV SECRET_TOKEN=asecuretokenwouldnormallygohere

WORKDIR /myapp

COPY Gemfile /myapp/Gemfile
RUN gem update --system
RUN gem install bundler -v '2'

RUN bundle install
COPY . /myapp
RUN EDITOR="mate --wait" bin/rails credentials:edit
RUN rails generate devise:install
RUN rake assets:precompile

EXPOSE 3000

CMD bin/delayed_job start && bundle exec rails s -p 3000 -b 0.0.0.0
