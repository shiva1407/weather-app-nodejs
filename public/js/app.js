const WeatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message=document.querySelector('#message-1')
const forecast1 = document.querySelector('#message-2')

message.textContent=''
forecast1.textContent=''

WeatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    message.textContent = 'loading...'

   forecast1.textContent=''
    
    fetch('http://localhost:3000/weather?address=' +  location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                message.textContent=data.error

            }
            else{
                //console.log(data.location)
                //console.log(data.forecast)
                message.textContent=data.location
                forecast1.textContent=data.forecast
            }
        })
    })

})