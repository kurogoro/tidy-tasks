Rails.application.routes.draw do
  devise_for :people
  root 'tasks#index'
  resources :tasks, only: [:index]
  resources :groups, only: [:new, :create]
  resources :people, only: [:index] do
    collection do
      get 'search'
    end
  end
end
