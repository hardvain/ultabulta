json.array!(@examples) do |example|
  json.extract! example, :id, :content
  json.url api_word_example_url(example, format: :json)
end
