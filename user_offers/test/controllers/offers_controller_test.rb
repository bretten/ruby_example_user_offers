require "test_helper"

class OffersControllerTest < ActionDispatch::IntegrationTest
  test "should be unauthorized when not logged in" do
    get offers_index_url
    assert_response :unauthorized
  end
end
