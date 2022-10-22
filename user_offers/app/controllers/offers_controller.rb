class OffersController < ApplicationController
  before_action :authenticate_user!

  def index
    offer_demographics = OfferDemographic.includes(:offer).where('gender = ? AND minimum_age <= ? AND maximum_age >= ?', current_user.gender, current_user.age_in_years(DateTime.now.to_date), current_user.age_in_years(DateTime.now.to_date))
    offers = offer_demographics.map do |r|
      r.attributes.merge(
        'offer' => r.offer
      )
    end
    render json: {
      message: offers
    }
  end
end
