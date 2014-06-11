require 'rails_helper'

feature 'The one-page contact manager app' do

  before do
    load "#{Rails.root}/db/seeds.rb"
  end

  scenario 'The homepage loads', js: true do
    visit '/'
    expect(page).to have_title("Contact Manager")
    expect(page).to have_content("Joe Example")
    expect(page).to have_content("Edna Example")
  end

end