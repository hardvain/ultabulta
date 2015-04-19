json.array!(@words) do |word|
  json.extract! word, :id, :name, :mnemonics, :examples, :meanings
  json.url word_url(word, format: :json)
end
