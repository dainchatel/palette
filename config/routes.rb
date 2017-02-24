Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  ####
  get 'signup'  => 'users#new'
    resources :users
  get 'login' => 'sessions#new'
  post 'login' => 'sessions#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
