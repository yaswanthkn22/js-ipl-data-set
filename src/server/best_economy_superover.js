import { deliveries_fun } from "./write_to_json.js";


function best_economy_superover(deliveries = []){
    let result_obj = {};
    for(let del of deliveries){
        if(del.is_super_over === '1'){
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
        }
    }

    for(let player in result_obj){
        result_obj[player] = result_obj[player][1]/(result_obj[player][0]/6);
    }
    const result = Object.entries(result_obj).sort((a,b)=>{
        if (a[1] > b[1]){
            return 1;
        }else if(a[1] < b[1]){
            return -1;
        }else return 0;
    });
    let player = {};
    player[result[0][0]] = result[0][1];
    return player;
   
}

deliveries_fun([],best_economy_superover,'economy_insuperover.json');
