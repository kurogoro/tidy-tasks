class PublicAccess < ActiveHash::Base
  self.data = [
      {id: 0, name: '非公開'},
      {id: 1, name: '公開'}
  ]
end