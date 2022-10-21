class Offer < ApplicationRecord
  has_many :offer_demographics
  validates :description, presence: true
end
