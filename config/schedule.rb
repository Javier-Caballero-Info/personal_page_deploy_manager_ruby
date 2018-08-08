set :output, "#{path}/log/cron.log"

every(1.minute) {
  # command "curl http://localhost:3000"
}

every 1.minute do
  # runner "puts 'Hola'"
end
