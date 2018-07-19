class Deploy < ApplicationRecord
  belongs_to :environment
  has_many :deploy_app

  def perform_deploy
    Thread.new do
      sleep 30
      self.status = 'finished'
      self.save
    end
  end

end
