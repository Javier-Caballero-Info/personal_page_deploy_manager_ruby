FROM ruby:2.3.1
RUN apt-get update -qq && apt-get install -y build-essential nodejs
RUN mkdir /myapp

ENV RAILS_ENV=production

WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
COPY . /myapp
RUN rake assets:precompile
RUN rails credentials:edit

EXPOSE 3000

CMD bundle exec rails s -p 3000 -b '0.0.0.0'
