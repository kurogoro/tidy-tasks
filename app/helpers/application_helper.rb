module ApplicationHelper

  def set_class_today(day, today, class_array)
    if day == today
      class_array << "main-page__body__table__inner__column__row--date--today"
    end
    return class_array
  end

  def set_class_today_top(day, today, class_array)
    if day == today
      class_array << ["main-page__body__table__inner__column__row--date--today", "main-page__body__table__inner__column__row--border-top-red"]
    end
    return class_array
  end
end
