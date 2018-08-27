FROM ruby:2.3.1
RUN apt-get update -qq && apt-get install -y build-essential nodejs
RUN mkdir /myapp

ENV RAILS_ENV=production

WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN gem install bundler
RUN bundle install
COPY . /myapp
RUN EDITOR="mate --wait" bin/rails credentials:edit
RUN SECRET_KEY_BASE=`rake secret`
RUN rake assets:precompile

EXPOSE 3000

CMD bundle exec rails s -p 3000 -b '0.0.0.0'
