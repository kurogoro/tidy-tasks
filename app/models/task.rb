class Task < ApplicationRecord
  belongs_to :project
  belongs_to :work_process
  belongs_to :public_access
end
