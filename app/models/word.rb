class Word < ActiveRecord::Base
  has_many :examples
  has_many :meanings
  has_many :mnemonics
end
