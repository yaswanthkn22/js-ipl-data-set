import * as fs from "fs";
import { parse } from "csv-parse";


let matches_2016 = new Set();
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
    if(row.season === '2016'){
        matches_2016.add(row.id);
    }
})
.on("error", function(error){
    console.log(error.message);
})
.on("end", function(){
    console.log("parsed csv data of matches");

    let deliveries = [];

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
        if(matches_2016.has(row.match_id)){
            deliveries.push(row);
        }
    })
    .on("error", function(error){
        console.log(error.message);
    })
    .on("end", function(){
        console.log("parsed csv data of deliveries");
       
        let result =  deliveries.reduce((result_obj, current) => {

            if (result_obj[current.bowling_team]) {
                result_obj[current.bowling_team] += Number(current.extra_runs);
            } else
                result_obj[current.bowling_team] = Number(current.extra_runs);

            return result_obj;
        },{})




        fs.writeFile(`src/public/output/extras_eachteam_2016.json`, JSON.stringify(result), (error) => {
            if (error) throw error;
          });
    });


});