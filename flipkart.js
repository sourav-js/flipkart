require("dotenv");
var express=require("express"),
app        =express(),
fs         =require("fs"),
request    =require("request"),
cheerio    =require("cheerio");
var items=[]
app.use(express.json());

app.get("/:id",function(req,res){


	request(`https://www.flipkart.com/search?q=${req.params.id}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off`,function(error,response,html){

		if (!error && response.statusCode==200){

             
			const $=cheerio.load(html)
            $("._1xHGtK").each(function(i,el){

                               

                  	 var datas=$(el)

                     var obj={

                     	
                     	productName:datas.find(".IRpwTa").attr("title"),
                     	offerPrice:parseInt(datas.find("._30jeq3").text().replace("₹","")),
                        actualPrice:parseInt(datas.find("._3I9_wc").text().replace("₹","").replace(",","")),
                        off:datas.find("._3Ay6Sb").text()
                     }

                                 items.push(obj)

                 

            }) 
           
		     var obje={

                  	items:items
                  } 
		    var finaldata=JSON.stringify(obje,null,2)
		    fs.writeFile("./ekart.json",finaldata,dones)
		    function dones(){

		    	fs.readFile("./ekart.json","utf-8",function(err,data){

		    	     var result=JSON.parse(data)
		    	     res.send(result)

		    	})
		    }

		    console.log(items) 

		}
	    

	})
})

app.get("/data",function(req,res){

	
		
	
})
app.listen(1222,function(){

	console.log("server has started")
})