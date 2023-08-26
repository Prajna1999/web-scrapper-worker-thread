const axios=require("axios");
const cheerio=require("cheerio");
const { error } = require("console");
const {parentPort}=require('worker_threads');

parentPort.on("message", async (url)=>{
    const data=await scrapeData(url);
    parentPort.postMessage(data);
});

async function scrapeData(url){

    try{
        const response=await axios.get(url);
        const $=cheerio.load(response.data);
        const titles = [];
        $("header").each((index, element) => {
          titles.push($(element).text());
    
    
        });
    
        return titles;
    }catch(error){
        console.log(`Error scarapping ${url}:`, error);
        return [];
    }
}

module.exports =parentPort;