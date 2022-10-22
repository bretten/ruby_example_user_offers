class OffersController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: {
      message: "Test for #{current_user}"
    }
  end
end
