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
  correctAnswers varchar
}
Table UserAnswers {
  UserID integer
  LobbyID integer
  QuestionID varchar
  choosenAnswers varchar
  Duration varchar
}
Ref: Lobby.UserID <> User.id // many-to-many
Ref: Lobby.Host > User.id // many-to-many
Ref: UserAnswers.UserID - User.id // one-to-one
Ref: UserAnswers.LobbyID > Lobby.id // many-to-one
Ref: UserAnswers.QuestionID > Question.id // many-to-one

## new version not finished

Table lobby {
  id varchar [primary key]
  createdDate datetime [not null]
  closeDate datetime
  activeQuestionStart datetime
  activeQuestion integer [not null]
  questionDuration integer [not null]
  state varchar [not null]
  hostSocketId varchar//FK
}
Table lobby_players_user {
  lobbyId varchar [primary key]//FK 
  userSocketId varchar //FK
}
Table lobby_questions_question {
  lobbyId varchar [primary key]//FK
  questionId varchar //FK
}

Table User {
  socketId integer [primary key]
  username varchar
}
Table Question {
  id varchar [primary key]
  QuestionText varchar
  a varchar
  b varchar
  c varchar
  d varchar
  correctAnswers varchar
}
Table UserAnswers {
  id integer [primary key]
  choosenAnswers varchar
  reactionTime varchar
  userSocketId varchar //FK
  lobbyId integer //FK
  questionId varchar //FK
}