FactoryBot.define do
  factory :user do
    email { "user3@example.com" }
    first_name { "Other" }
    last_name { "Doe" }
    birthdate { "2010-01-01" }
    gender { 1 }
    jti { "jti" }
    password { "testpassword" }
  end
end