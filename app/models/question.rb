class Question < ActiveRecord::Base
  belongs_to :passage
  has_many :answers
end
