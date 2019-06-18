var request = require('request')

const forecast = (lat,long,callback) =>
{
    const url ='https://api.darksky.net/forecast/a51735ee3cb913c5cdb32b0e18f82d31/'+ lat +','+ long

    request({url:url,json:true},(error,response) => {
    
               if(error)
                {
                  callback('sorry unable to connect to weather service!',undefined)
                }
               else if(response.body.error)
               {
                callback('sorry  unable to find location ..please check the location info..',undefined)
                }
                else
                {
                    callback(undefined,response.body.daily.data[0].summary  + 'it is currently '+response.body.currently.temperature +' and ' + response.body.currently.precipProbability + ' % percent of probability of rain')
                }
            

    })

}
module.exports=forecast