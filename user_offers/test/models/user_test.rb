require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should not save user without email" do
    user = User.new(email: nil, first_name: "joe", last_name: "doe", birthdate: "2010-01-01", gender: 1, password: "testpassword", jti: "jti")
    assert_not user.save
  end
  test "should not save user if email exists" do
    user = User.new(email: "user3@example.com", first_name: "joe", last_name: "doe", birthdate: "2010-01-01", gender: 1, password: "testpassword", jti: "jti")
    assert user.save
    user_duplicate = User.new(email: "user3@example.com", first_name: "joe", last_name: "doe", birthdate: "2010-01-01", gender: 1, password: "testpassword", jti: "jti")
    assert_not user_duplicate.save
  end
  test "should save user when all required fields present" do
    user = User.new(email: "user3@example.com", first_name: "joe", last_name: "doe", birthdate: "2010-01-01", gender: 1, password: "testpassword", jti: "jti")
    assert user.save, "Saved user with all required fields"
  end
  test "should calculate years from birthdate" do
    user = User.new(email: "user3@example.com", first_name: "joe", last_name: "doe", birthdate: "2012-01-01", gender: 1, password: "testpassword", jti: "jti")
    years = user.age_in_years(DateTime.now.to_date)
    assert years == 10
  end
end
