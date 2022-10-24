Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:30000', 'localhost:30001'

    resource '*',
             headers: :any,
             expose: ['access-token', 'expiry', 'token-type', 'Authorization'],
             methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
