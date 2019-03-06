Rails.application.config.session_store :cookie_store, domain: {
      production: '.javiercaballero.info',
      development: 'localhost'
  }.fetch(Rails.env.to_sym, :all)
