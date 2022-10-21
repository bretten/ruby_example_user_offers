class User < ApplicationRecord
  validates :username, length: { minimum: 3 }, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :birthdate, presence: true
  validates :gender, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 3 }
  validates :password, presence: true

  def age_in_years(date_to_calculate_age)
    age_in_days = (date_to_calculate_age - birthdate).to_i
    age_in_seconds = age_in_days * 86400 # seconds in a day
    ActiveSupport::Duration.build(age_in_seconds).in_years.floor
  end
end
