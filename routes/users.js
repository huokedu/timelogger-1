module.exports = (api, Users, Login, functions, _) => {
    api.get('/user/users', (req, res)=>{
        Users.find({
            access:'staff'
        },(err, data)=>{
            if(err){
                return res.status(500).json({
                    message:"there was an error"
                })
            }
            console.log(data)
            return res.status(200).json(data)
        })
    })

    api.get('/user/:email', (req, res)=>{
       
        Login.find({
            email: req.params.email
        }).sort({dateLoggedIn:-1}).limit(10).exec((err, data)=>{
            
            if(err){
                return res.status(500).json({
                    message:"there was an error"
                })
            }
          
            return res.status(200).json(data)
        })
    })
}