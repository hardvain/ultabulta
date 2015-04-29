json.array!(@passages) do |passage|
  json.extract! passage, :id, :content, :passage_type
  json.url passage_url(passage, format: :json)
end
