json.array!(@meanings) do |meaning|
  json.extract! meaning, :id, :content
  json.url meaning_url(meaning, format: :json)
end
