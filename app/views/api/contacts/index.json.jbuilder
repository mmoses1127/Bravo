@contacts.each do |contact|
  json.set! contact.id do
    json.extract! contact, :id, :company, :title, :connection_description, :linked_in, :name, :email, :phone_number, :user_id, :column_order, :date_connected, :created_at
  end
end