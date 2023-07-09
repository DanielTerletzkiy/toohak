# Entitys

Lobby(ID, Created, closedDate, UserID(manyToMany), Host (UserID))
User (ID, SocketID, Name)
Question(ID(API-ID), QuestionText, a, b, c, d, correctAnswers)
UserAnswers(UserID, LobbyID(manyToOne), QuestionID, choosenAnswers, Duration)

## other information
SocketID= for Connection identification

## tutorials
- https://youtu.be/rKgZLVgdvAY (TypeORM Relationship)
- https://youtu.be/5G81_VIjaO8 (TypeORM Migrations)
