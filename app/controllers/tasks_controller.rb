class TasksController < ApplicationController
  def index
    @today = Time.now.midnight
    @first_day = @today.beginning_of_month
    @last_day = (@today + 13.month).beginning_of_month - 1.days
    @days = set_days(@first_day, @last_day)
  end

  def search
    @tasks = Task.where.not(id: search_params[:task_ids]).where('name LIKE(?)', "#{search_params[:keyword]}%")
    respond_to do |format|
      format.html
      format.json
    end
  end

  private

  def search_params
    params.permit(:keyword, { task_ids: [] })
  end

  def set_days(first_day, last_day)
    days = []
    ((last_day - first_day)/24/60/60).to_i.times do |i|
      days << first_day + i.days
    end
    return days
  end
end
