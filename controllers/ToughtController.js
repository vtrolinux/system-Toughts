const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController {
    static async dashboard(req, res) {
        const userId = req.session.userid
    /*
        const user = await User.findOne({
            where: {
            id: userId,
        },
            include: Tought,
            plain: true,
        })
    
        const toughts = user.Toughts.map((result) => result.dataValues)
    
        let emptyToughts = true
    
        if (toughts.length > 0) {
          emptyToughts = false
        }
    
        console.log(toughts)
        console.log(emptyToughts)
        //res.render('toughts/dashboard', { toughts, emptyToughts })
    */
        res.render('toughts/dashboard')
    }
    static showToughts(req,res){
        res.render('toughts/home')
    }
    static createTought(req,res){
        res.render('toughts/create')
    }
    static async createToughtSave(req, res){
        
    }
}