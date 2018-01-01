module.exports = (api, Users, Login, functions, _) => {

  api.post('/auth/signup', (req, res) => {

    console.log("rundown")
    var hash = functions.encryptPassword(req.body.password);
    var email = req.body.email.trim().toLowerCase();

    var userObject = {
      email: email,
      access: req.body.access,
      password: hash

    }
    return Users.findOne({
      email: userObject.email
    }, (err, response) => {
      if (_.isNull(response)) {

        Users.create(userObject, (err, response) => {
          if (err) {
            res.status(500).json({
              message: 'The user account could not be created',
              type: false

            })
          }

          res.status(200).json({
            message: 'Account created successfully',
            type: true
            
          })

        })
      } else
     
    
      res.status(200).json({
        message: "User Already exists",
        type: false
        
      })

    })
  })

  api.post('/auth/login', (req, res) => {

    Users.findOne({
      email: req.body.email
    }, (err, user) => {
      
      if (!_.isNull(user) && functions.verifyPassword(req.body.password, user.password)) {

        req.body = null;
        Login.create({
          email: user.email
        }, (err, data) => {

          if (err) {
            return res.json({
              message: ' There was a problem while creating taking timestamp',
              type: false
            })
          } else {

            Login.find({
              email: user.email
            }).sort({dateLoggedIn:-1}).limit(10).exec((err, logins)=>{

              if (err) {
                return res.json({
                  message: ' There was a problem finding previous logins',
                  type: false
                })
              }

              return res.status(200).json({
                message: 'Timestamped',
                type: true,
                user: data,
                data: user.access,
                logins:logins
              })
            })

           
          }

        })


      } else
        return res.json({
          message: 'User Doesnt Exist ',
          type: false
        })
    })
  })
}
