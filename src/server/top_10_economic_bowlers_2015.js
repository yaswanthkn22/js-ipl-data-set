import * as fs from "fs";
import { parse } from "csv-parse";


let matches_2015 = new Set();
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
    if(row.season === '2015'){
        matches_2015.add(row.id);
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
        if(matches_2015.has(row.match_id)){
            deliveries.push(row);
        }
    })
    .on("error", function(error){
        console.log(error.message);
    })
    .on("end", function(){
        console.log("parsed csv data of deliveries");
       
        let result =  deliveries.reduce((result_obj, del) => {

            if(result_obj[del.bowler]){
                if(del.wide_runs != '0' || del.noball_runs != '0') {
                    result_obj[del.bowler][0] += 0;
                }else result_obj[del.bowler][0] += 1;
                result_obj[del.bowler][1] += (Number(del.batsman_runs)+Number(del.wide_runs) + Number(del.noball_runs))
            }
            else {
                result_obj[del.bowler] = [];

                if(Number(del.wide_runs) != 0 || Number(del.noball_runs) != 0) {
                    result_obj[del.bowler][0] = 0;
                }else result_obj[del.bowler][0] = 1;

                result_obj[del.bowler][1] = (Number(del.batsman_runs)+Number(del.wide_runs) + Number(del.noball_runs))
            }

            return result_obj
        },{});

        for(let player in result){
            result[player] = Math.round(result[player][1]/(result[player][0]/6) , 2);
        }
        const  obj= Object.entries(result).sort((a,b)=>{
            if (a[1] > b[1]){
                return 1;
            }else if(a[1] < b[1]){
                return -1;
            }else return 0;
        });
        result = {};
        for(let player_eco of obj.slice(0,10)){
            result[player_eco[0]] = player_eco[1];
        }
        fs.writeFile(`src/public/output/top_10_economic_bowlers_2015.json`, JSON.stringify(result), (error) => {
            if (error) throw error;
          });
    });


});