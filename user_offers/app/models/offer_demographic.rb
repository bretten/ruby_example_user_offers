class OfferDemographic < ApplicationRecord
  belongs_to :offer
  validates :minimum_age, presence: true, comparison: { greater_than: :maximum_age }
  validates :maximum_age, presence: true, comparison: { less_than: :minimum_age }
  validates :gender, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 3 }
end
