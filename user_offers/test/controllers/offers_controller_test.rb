require "test_helper"

class OffersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "should be unauthorized when not logged in" do
    get offers_index_url
    assert_response :unauthorized
  end

  test "should be ok when logged in" do
    sign_in FactoryBot.create(:user)
    get offers_index_url
    assert_response :ok
  end
end
