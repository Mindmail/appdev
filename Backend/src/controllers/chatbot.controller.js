const fetch = require('node-fetch');
const HttpException = require("../utils/HttpException.utils");

const getResponse = async (req, res, next) => {
    try {

        const response = await fetch(`${process.env.CHATBOT_API}/affirmation`, {
            method: 'post',
            body: JSON.stringify(req.body),
            headers: {'Content-Type': 'application/json'}
        })
        
        if ( response.status != 200 ) {
            throw new HttpException(500, "Something went wrong");
        } else {
            const result = await response.json()
            if( result.status ){
                res.send({ type: true, message: result.bot });
            }else{
                res.send({ type: false })
            }
        }
      } catch (error) {
        console.log(error);
        res.send({ type: false });
      }
  };

module.exports = {
    // default
    getResponse,
}
