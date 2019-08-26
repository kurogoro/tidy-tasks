Rails.application.routes.draw do
  devise_for :people
  root 'tasks#index'
  resources :projects, only: [:new, :create]
  resources :tasks, only: [:index]
  resources :groups, only: [:new, :create] do
    collection do
      get 'search'
    end
  end
  resources :people, only: [:index] do
    collection do
      get 'search'
    end
  end
end
