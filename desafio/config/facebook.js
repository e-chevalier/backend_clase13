import 'dotenv/config'

let fb_config = {
    facebookid: process.env.FACEBOOKID,
    facebooksecret: process.env.FACEBOOKSECRET,
    facebook_callback: 'https://localhost:8080/auth/facebook/callback'
}

export { fb_config }
   