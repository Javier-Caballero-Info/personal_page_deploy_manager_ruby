# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_08_03_213605) do

  create_table "app_versions", force: :cascade do |t|
    t.string "name"
    t.boolean "deleted"
    t.integer "app_id"
    t.integer "stable"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["app_id"], name: "index_app_versions_on_app_id"
  end

  create_table "apps", force: :cascade do |t|
    t.string "name"
    t.string "docker_image"
    t.string "exposed_ports"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer "priority", default: 0, null: false
    t.integer "attempts", default: 0, null: false
    t.text "handler", null: false
    t.text "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string "locked_by"
    t.string "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority"
  end

  create_table "deploy_app_environment_vars", force: :cascade do |t|
    t.integer "deploy_app_id"
    t.string "key"
    t.text "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deploy_app_id"], name: "index_deploy_app_environment_vars_on_deploy_app_id"
  end

  create_table "deploy_apps", force: :cascade do |t|
    t.integer "deploy_id"
    t.integer "app_id"
    t.integer "app_version_id"
    t.integer "deploy_setup_id"
    t.string "ports", default: ""
    t.string "restart_policy"
    t.string "container_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["app_id"], name: "index_deploy_apps_on_app_id"
    t.index ["app_version_id"], name: "index_deploy_apps_on_app_version_id"
    t.index ["deploy_id"], name: "index_deploy_apps_on_deploy_id"
    t.index ["deploy_setup_id"], name: "index_deploy_apps_on_deploy_setup_id"
  end

  create_table "deploy_setup_items", force: :cascade do |t|
    t.integer "deploy_setup_id"
    t.integer "environment_var_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deploy_setup_id"], name: "index_deploy_setup_items_on_deploy_setup_id"
    t.index ["environment_var_id"], name: "index_deploy_setup_items_on_environment_var_id"
  end

  create_table "deploy_setups", force: :cascade do |t|
    t.integer "environment_id"
    t.integer "app_version_id"
    t.string "restart_policy"
    t.string "ports", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["app_version_id"], name: "index_deploy_setups_on_app_version_id"
    t.index ["environment_id"], name: "index_deploy_setups_on_environment_id"
  end

  create_table "deploys", force: :cascade do |t|
    t.string "name"
    t.string "status"
    t.integer "environment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["environment_id"], name: "index_deploys_on_environment_id"
  end

  create_table "environment_vars", force: :cascade do |t|
    t.string "key"
    t.text "body"
    t.integer "app_id"
    t.integer "environment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["app_id"], name: "index_environment_vars_on_app_id"
    t.index ["environment_id"], name: "index_environment_vars_on_environment_id"
  end

  create_table "environments", force: :cascade do |t|
    t.string "name"
    t.string "portainer_url"
    t.integer "endpoint_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
