# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_02_26_225336) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "comments", force: :cascade do |t|
    t.string "body", null: false
    t.bigint "commenter_id", null: false
    t.bigint "ride_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["commenter_id"], name: "index_comments_on_commenter_id"
    t.index ["ride_id"], name: "index_comments_on_ride_id"
  end

  create_table "contacts", force: :cascade do |t|
    t.datetime "date_connected"
    t.string "company", null: false
    t.string "title"
    t.string "connection_description"
    t.string "email"
    t.string "phone_number"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "column_order", default: 0, null: false
    t.string "name"
    t.string "linked_in"
    t.index ["user_id"], name: "index_contacts_on_user_id"
  end

  create_table "interactions", force: :cascade do |t|
    t.datetime "date_contacted", null: false
    t.string "contact_method"
    t.datetime "next_contact_date"
    t.string "notes"
    t.bigint "contact_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "interaction_number"
    t.index ["contact_id"], name: "index_interactions_on_contact_id"
    t.index ["user_id"], name: "index_interactions_on_user_id"
  end

  create_table "kudos", force: :cascade do |t|
    t.bigint "giver_id", null: false
    t.bigint "ride_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["giver_id", "ride_id"], name: "index_kudos_on_giver_id_and_ride_id", unique: true
    t.index ["giver_id"], name: "index_kudos_on_giver_id"
    t.index ["ride_id"], name: "index_kudos_on_ride_id"
  end

  create_table "rides", force: :cascade do |t|
    t.datetime "date_time", null: false
    t.string "title", null: false
    t.string "description"
    t.bigint "athlete_id"
    t.float "distance", null: false
    t.float "elevation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "duration", null: false
    t.text "gps_points", default: [], array: true
    t.string "polyline"
    t.index ["athlete_id"], name: "index_rides_on_athlete_id"
  end

  create_table "tiers", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", default: "New Tier", null: false
    t.integer "position", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_tiers_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", null: false
    t.string "plan", default: "free", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "comments", "rides"
  add_foreign_key "comments", "users", column: "commenter_id"
  add_foreign_key "contacts", "users"
  add_foreign_key "interactions", "contacts"
  add_foreign_key "interactions", "users"
  add_foreign_key "kudos", "rides"
  add_foreign_key "kudos", "users", column: "giver_id"
  add_foreign_key "rides", "users", column: "athlete_id"
  add_foreign_key "tiers", "users"
end
