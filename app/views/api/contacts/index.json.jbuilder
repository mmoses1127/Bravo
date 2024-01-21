@contacts.each do |contact|
  json.set! contact.id do
    json.extract! contact, :id, :company, :title, :connection_description, :first_name, :last_name, :email, :phone_number, :user_id, :column_order, :date_connected
    json.interactions contact.interactions
  end
end