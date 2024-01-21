@contacts.each do |contact|
  json.set! contact.id do
    json.extract! contact, :id, :company, :title, :connection_description, :first_name, :last_name, :email, :phone_number, :user_id, :status_id
    json.date_connected contact.date_connected.strftime("%m/%d/%Y")
    json.status contact.status.title
    json.interactions contact.interactions
  end
end