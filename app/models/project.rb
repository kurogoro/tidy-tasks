class Project < ApplicationRecord
  validates :name, :public_access_id, presence: true

  belongs_to :administrator, class_name: "Person", foreign_key: 'administrator_id'
  has_many :project_groups
  has_many :groups, through: :project_groups
  has_many :tasks
  belongs_to_active_hash :public_access
end
