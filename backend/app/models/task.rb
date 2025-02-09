class Task < ApplicationRecord
    validates :title, presence: true, length: { maximum: 255 } # Title is required and must be ≤ 255 chars
    validates :description, length: { maximum: 1000 } # Description has a max length of 1000 chars
    validates :completed, inclusion: { in: [0, 1,true,false] }
end
