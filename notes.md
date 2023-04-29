Client ID: 5c7e7b4931784167cbff 
Client Secret: a71ca2f275ab21054c1f21e84ff181c29c6b8a96

const client_id = "5c7e7b4931784167cbff" 
const client_secret = "a71ca2f275ab21054c1f21e84ff181c29c6b8a96"








npx sequelize-cli model:generate --name=Quiz --attributes=name:string,weight:integer

npx sequelize-cli model:generate --name=Question --attributes=question_text:string,quizId:integer

npx sequelize-cli model:generate --name=Choice --attributes=choice_text:string,questionId:integer

npx sequelize-cli model:generate --name=LoginToken --attributes=token:string