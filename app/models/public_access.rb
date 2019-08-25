class PublicAccess < ActiveHash::Base
  self.data = [
      {id: 0, name: 'private'},
      {id: 1, name: 'public'}
  ]
end