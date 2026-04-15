# frozen_string_literal: true

# Solid Queue ships db/queue_schema.rb (no gem migrations). When the queue DB
# shares a PostgreSQL database with primary, db:prepare will not load that file
# because schema_migrations already exists — then solid_queue_jobs is missing.
class LoadSolidQueueSchema < ActiveRecord::Migration[8.1]
  def up
    return if table_exists?(:solid_queue_jobs)

    load Rails.root.join("db/queue_schema.rb")
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
