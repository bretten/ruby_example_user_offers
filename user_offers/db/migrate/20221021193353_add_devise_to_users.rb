class AddDeviseToUsers < ActiveRecord::Migration[7.0]
  def change
    remove_index :users, column: [:username]
    change_table :users do |t|
      ## database_authenticatable
      t.rename :username, :email
      t.rename :password, :encrypted_password

      ## rememberable
      t.datetime :remember_created_at
    end
    change_column_null :users, :email, false
    change_column_null :users, :encrypted_password, false
    add_index :users, :email, unique: true
  end
end
