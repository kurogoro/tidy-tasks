Rails.application.routes.draw do
  devise_for :people
  root 'tasks#index'
  resources :tasks, only: [:index]
end
