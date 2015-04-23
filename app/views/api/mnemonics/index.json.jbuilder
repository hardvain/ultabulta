json.array!(@mnemonics) do |mnemonic|
  json.extract! mnemonic, :id, :content
end
