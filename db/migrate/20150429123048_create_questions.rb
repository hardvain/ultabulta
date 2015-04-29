class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.text :content
      t.string :answer
      t.belongs_to :passage, index: true
      t.timestamps null: false
    end
  end
end
