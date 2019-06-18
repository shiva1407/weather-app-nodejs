const express = require('express')
const path = require('path')
const hbs = require('hbs')
//const geocode = require('./utils/geocode')
//const forecast = require('./utils/forecast')
const geocode =require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

const app = express()
//  define path for express config
const publicDirectoryPath =path.join(__dirname,'../public') 
const ViewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//  setup handlebars  engine and views location
app.set('view engine','hbs')
app.set('views',ViewsPath)
hbs.registerPartials(partialsPath)
// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather APP',
        name:'KSSVP'

    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'Weather',
        name:'KKSSP'

    })
})
app.get('/help',(req,res)=>{
    res.render('weather',{
        title: 'forecasting weather',
        name:'KKSSP'

    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    // res.send({
    //     title: 'this is weather forecasting',
    //     forecast :'it is snowong',
    //     location:'hyderabad',
    //     address:req.query.address
    // })
    geocode(req.query.address,(error,{ latitude,longitude,location }= {}) => {

           // console.log('shivna')

           if(error === undefined)
           {
                return res.send({ error })
           }
           //sssss
      // console.log('shiva')

        forecast(latitude,longitude,(error,forecastData)=>{

        if(error)
        {
             return res.send({ error })
        }
        res.send({
            forecast:forecastData,
            location,
            address: req.query.address
            })
          })
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'kssvp',
        errormessage:'help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: 404,
        name:'kssvp',
        errormessage:'Page not Found'
    })
})
app.listen(3000, ()=> {
    console.log('server is up port 3000')
})