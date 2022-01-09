# nodejs-user-and-messages-API
nodeJS users and messages API using __MongoDB__. 

## how to run : download the code open it with your editor (ex: VScode) open terminal then run (npm install) to download the modules file.

### the DataBase contain two tables which are :
#### -Users ( id, name, email, password, age , is_deleted). 
id is auto generated field you don't write it in the Schema of the collection.
#### -Messages ( id, content, sendBy = userId , sendTo=userId ).
#### The Api Provides Endpoints for : 

1. addUser -signup-
2. get all users. 
3. update user by Id.
4. delete user by Id.
5. get user by Id. 
6. get user by email and password. -signin-
7. soft delete for user. (delete profile but not delete it from the database).
8. get user’s name starts with any string. (string passed as a param in the url).
9. get youth user by age. (ages between 20 and 30).
11 get all messages.
12. get messages with information of sender and receiver -users-.
