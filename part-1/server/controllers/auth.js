const users = []
const bcrypt = require('bcryptjs');

module.exports = {
    login: (req, res) => {
      const { username, password } = req.body;
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const authenticated = bcrypt.compareSync(password, users[i].passwordHash);
          if(authenticated) {
            let userToSend = {...users[i]};
            delete userToSend.passwordHash;
            console.log(userToSend);
            res.status(200).send(userToSend);
          }
        }
      }
      res.status(400).send("User not found.");
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
        //console.log(userDataToSend);
        //console.log(userDataToStore);
        res.status(200).send(userDataToSend);
    }
}