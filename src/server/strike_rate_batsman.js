import * as fs from "fs";
import { parse } from "csv-parse";



let season_start_matches = [];
let seasons = new Set();
let years = [];
seasons.add('2017');
years.push('2017');
let curr_season = '2017';
let curr_id = 1;

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
    if( seasons.has(row.season)){
        curr_season = row.season;
        curr_id = row.id;
        
    }else {
        season_start_matches.push(curr_id);
        years.push(row.season);
        seasons.add(row.season)
    }

})
.on("error", function(error){
    console.log(error.message);
})
.on("end", function(){
    console.log("parsed csv data of matches");

    
    season_start_matches.push(curr_id);

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
        
        deliveries.push(row);

    })
    .on("error", function(error){
        console.log(error.message);
    })
    .on("end", function(){
        console.log("parsed csv data of deliveries");
      

        let season_batter_balls_runs = deliveries.reduce((acc,del)=>{

            if(Number(del.match_id) <= Number(season_start_matches[0])){
                if(acc[years[0]]){
                    if(acc[years[0]][del.batsman]){

                        if(Number(del.wide_runs) != 0 || Number(del.noball_runs) != 0) {
                            acc[years[0]][del.batsman][0] += 0;
                         }else acc[years[0]][del.batsman][0] += 1;

                        acc[years[0]][del.batsman][1] += Number(del.batsman_runs);
                    }else {
                        acc[years[0]][del.batsman] = [];

                        if(Number(del.wide_runs) != 0 || Number(del.noball_runs) != 0) {
                           acc[years[0]][del.batsman][0] = 0;
                        }else acc[years[0]][del.batsman][0] = 1;

                        acc[years[0]][del.batsman][1] = Number(del.batsman_runs);
                    }
                }else {
                    acc[years[0]] = {};
                    acc[years[0]][del.batsman] = [];

                    if(Number(del.wide_runs) != 0 || Number(del.noball_runs) != 0) {
                        acc[years[0]][del.batsman][0] = 0;
                     }else acc[years[0]][del.batsman][0] = 1;

                     acc[years[0]][del.batsman][1] = Number(del.batsman_runs);

                }
            }else {
           
                season_start_matches.shift();
                years.shift();
            }

            return acc;
        },{})

        for(let year in season_batter_balls_runs ){
            for(let key in season_batter_balls_runs[year]){
                season_batter_balls_runs[year][key] = (season_batter_balls_runs[year][key][1]/season_batter_balls_runs[year][key][0]*100).toFixed(2);
            }
        }


        fs.writeFile(`src/public/output/strikerate_each_player.json`, JSON.stringify(season_batter_balls_runs), (error) => {
            if (error) throw error;
          });
    });


});


