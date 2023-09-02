const http=require("http");
const fs=require("fs");
const requests=require("requests");

const homefile=fs.readFileSync("home.html","utf-8");

replaceVal=(tempVal,orgVal)=>{
    let temprature=tempVal.replace("{%tempval%}",orgVal.main.temp);
    temprature=temprature.replace("{%tempmin%}",orgVal.main.temp_min);
    temprature=temprature.replace("{%tempmax%}",orgVal.main.temp_max);
    temprature=temprature.replace("{%location%}",orgVal.name);
    temprature=temprature.replace("{%country%}",orgVal.sys.country);
    temprature=temprature.replace("{%tempstatus%}",orgVal.weather[0].main);
    
    return temprature;
}

const server=http.createServer((req,res)=>{
   if(req.url==="/"){
    requests("https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=679a0a57bc81a5a0392d68d55cc3d835"
    )
      .on("data",(chunk)=>{
        const objdata=JSON.parse(chunk);
        const arrData=[objdata];
        // console.log(arrData[0].main.temp);

        const realTimeData=arrData.map((val)=>replaceVal(homefile,val)).join("");
        res.write(realTimeData);
        console.log(realTimeData);
      })
      .on("end",(err)=>{
        if(err) return console.log("connection error",err);
        res.end();
      });
   } 
});

server.listen(8000,"127.0.0.1");