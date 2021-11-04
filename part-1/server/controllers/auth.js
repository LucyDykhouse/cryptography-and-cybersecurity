const users = []

const bcrypt = require('bcryptjs');

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          res.status(200).send(users[i])
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        const {username, email, firstName, lastName, password} = req.body;
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(password, salt);

        let userDataToStore = {
          username,
          email,
          firstName,
          lastName,
          passwordHash
        };

        users.push(userDataToStore);
        let userDataToSend = {...userDataToStore};
        delete userDataToSend.passwordHash;
        console.log(userDataToSend);
        console.log(userDataToStore);
        res.status(200).send(userDataToSend);
    }
}