## Code (copy to https://dbdiagram.io/d):
// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table Lobby {
  id integer
  created varchar
  closeDate varchar
  UserID integer
  Host integer
}
Table User {
  id integer
  SocketID varchar
  Name varchar
}
Table Question {
  id varchar
  QuestionText varchar
  a varchar
  b varchar
  c varchar
  d varchar
  correctAnswere varchar
}
Table UserAnswere {
  UserID integer
  LobbyID integer
  QuestionID varchar
  choosenAnswere varchar
  Duration varchar
}
Ref: Lobby.UserID <> User.id // many-to-many
Ref: Lobby.Host > User.id // many-to-many
Ref: UserAnswere.UserID - User.id // one-to-one
Ref: UserAnswere.LobbyID > Lobby.id // many-to-one
Ref: UserAnswere.QuestionID > Question.id // many-to-one