Rails.application.routes.draw do
  devise_for :people
  root 'tasks#index'
  resources :projects, only: [:new, :create, :show] do
    collection do
      get 'search'
    end
  end
  resources :tasks, only: [:index, :new, :create, :show] do
    collection do
      get 'search'
    end
  end
  resources :groups, only: [:new, :create, :show] do
    collection do
      get 'search'
    end
  end
  resources :people, only: [:index] do
    collection do
      get 'search'
      get 'add_group'
      get 'remove_group'
      get 'add_project'
      get 'remove_project'
      get 'add_task'
      get 'remove_task'
    end
  end
end
