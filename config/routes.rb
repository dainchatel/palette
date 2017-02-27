Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  get '/', to: 'hello_world#index'
  ####
  get 'signup'  => 'users#new'
    resources :users
  get 'login' => 'sessions#new'
  post 'login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'
  namespace :api, as: :api do
    resources :projects, only: [:create, :update, :index, :show, :destroy]

    resources :colors, only: [:create, :index, :show, :destroy]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
