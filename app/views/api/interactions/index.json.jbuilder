@interactions.each do |interaction|
  json.set! interaction.id do
    json.extract! interaction, :id, :date_contacted, :contact_method, :next_contact_date, :notes, :contact_id, :user_id
  end
end