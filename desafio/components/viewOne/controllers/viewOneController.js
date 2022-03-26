import { viewOneService } from '../services/viewOneService.js'

class ViewOne {
    async getViewOne(req, res, next) {
        
        try {
            await viewOneService.getViewOne()
            res.render('main', { username: req.session.username })
        } catch (error) {
            console.log(error);
        }
    }

}

export let viewOneController = new ViewOne()
