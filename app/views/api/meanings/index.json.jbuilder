json.array!(@meanings) do |meaning|
  json.extract! meaning, :id, :content
  json.url api_word_meaning_url(meaning, format: :json)
end
