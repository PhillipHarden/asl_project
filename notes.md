








npx sequelize-cli model:generate --name=Quiz --attributes=name:string,weight:integer

npx sequelize-cli model:generate --name=Question --attributes=question_text:string,quizId:integer

npx sequelize-cli model:generate --name=Choice --attributes=choice_text:string,questionId:integer

npx sequelize-cli model:generate --name=LoginToken --attributes=token:string