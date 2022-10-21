require "test_helper"

class OfferTest < ActiveSupport::TestCase
  test "should not save offer without description" do
    offer = Offer.new(description: nil)
    assert_not offer.save
  end
  test "should save offer with description" do
    offer = Offer.new(description: "offer desc")
    assert offer.save
  end
end
