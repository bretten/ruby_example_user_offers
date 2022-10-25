# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'faker'

User.create(email: "user1@example.com", first_name: "Jane", last_name: "Doe", birthdate: "1980-01-01", gender: 0, password: "password!", password_confirmation: "password!")
User.create(email: "user2@example.com", first_name: "John", last_name: "Doe", birthdate: "1999-01-01", gender: 1, password: "password!", password_confirmation: "password!")

100.times { |i|
  offer = Offer.create({ description: Faker::Marketing.buzzwords })
  gender = 0
  if i >= 25 and i < 50
    gender = 1
  elsif i >= 50 and i < 75
    gender = 2
  elsif i >= 75 and i <= 100
    gender = 3
  end

  10.times { |j|
    OfferDemographic.create(minimum_age: j * 10, maximum_age: (j + 1) * 10, gender: gender, offer_id: offer.id)
  }
}
