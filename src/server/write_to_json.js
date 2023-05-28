// const fs = require("fs");
import * as fs from'fs';
import { parse } from 'csv-parse';
// const { parse } = require("csv-parse");
// const my = require('./matches_per_year.js');

export default function matches_fun(matches = [],funct,filename){

    fs.createReadStream('/home/yaswanth/Desktop/js/js-ipl-data-set/src/data/matches.csv')
        .pipe(
            parse(
                {
                    delimiter: ",",
                    columns: true,
                    ltrim: true
                }
            )
        )
        .on("data",function(row){
            matches.push(row);
        })
        .on("error", function(error){
            console.log(error.message);
        })
        .on("end", function(){
            console.log("parsed csv data of matches");
            const result = funct(matches);
            fs.writeFile(`src/public/output/${filename}`, JSON.stringify(result), (error) => {
                if (error) throw error;
              });
        });
      
}


// reading deliveries

export function deliveries_fun(deliveries = [],funct,filename){

        fs.createReadStream("src/data/deliveries.csv")
        .pipe(
            parse(
                {
                    delimiter: ",",
                    columns: true,
                    ltrim: true
                }
            )
        )
        .on("data",function(row){
            //row
            deliveries.push(row);
        })
        .on("error", function(error){
            console.log(error.message);
        })
        .on("end", function(){
            console.log("parsed csv data of deliveries");
            const result = funct(deliveries);
            fs.writeFile(`src/public/output/${filename}`, JSON.stringify(result), (error) => {
                if (error) throw error;
              });
        });
}



 