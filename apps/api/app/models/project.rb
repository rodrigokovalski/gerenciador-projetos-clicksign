class Project < ApplicationRecord
    has_one_attached :image
    validates :name, :client, :start_date, :end_date, presence: true

    validate :name_must_have_two_words
    validate :end_date_after_start_date

    private

    def name_must_have_two_words
        if name.split.size < 2
            errors.add(:name, "deve ter pelo menos duas palavras")
        end
    end

    def end_date_after_start_date
        if end_date < start_date
            errors.add(:end_date, "deve ser após a data de início")
        end
    end
end
