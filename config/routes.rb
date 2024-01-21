Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # post '/api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :index, :update] do
      resources :rides, only: [:index]
    end
    resource :session, only: [:show, :create, :destroy]
    resources :rides, only: [:index, :show, :create, :update, :destroy]
    resources :kudos, only: [:create, :destroy, :index]
    resources :comments, only: [:create, :update, :destroy, :index]
    resources :contacts, only: [:create, :update, :destroy, :index, :show]
    resources :statuses, only: [:create, :update, :index]
    resources :interactions, only: [:create, :update, :destroy, :index, :show]
  end

  get '*path', to: "static_pages#frontend_index"
  
end
