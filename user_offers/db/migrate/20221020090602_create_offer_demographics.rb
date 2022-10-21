class CreateOfferDemographics < ActiveRecord::Migration[7.0]
  def change
    create_table :offer_demographics do |t|
      t.integer :minimum_age
      t.integer :maximum_age
      t.integer :gender
      t.references :offer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
