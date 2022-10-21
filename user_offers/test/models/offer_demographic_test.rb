require "test_helper"

class OfferDemographicTest < ActiveSupport::TestCase
  test "should not save offer demographic when maximum_age is less than minimum_age/minimum_age is greater than maximum_age" do
    o = OfferDemographic.create(minimum_age: 30, maximum_age: 20, gender: 1, offer_id: 1)
    assert_not o.save
  end
  test "should not save offer demographic when gender is out of range" do
    o = OfferDemographic.create(minimum_age: 20, maximum_age: 30, gender: 4, offer_id: 1)
    assert_not o.save
  end
  test "should not save offer demographic when there is no offer" do
    o = OfferDemographic.create(minimum_age: 20, maximum_age: 30, gender: 1, offer_id: nil)
    assert_not o.save
  end
  test "should save offer when all fields valid" do
    o = OfferDemographic.create(minimum_age: 20, maximum_age: 30, gender: 1, offer_id: 1)
    assert_not o.save
  end
end
