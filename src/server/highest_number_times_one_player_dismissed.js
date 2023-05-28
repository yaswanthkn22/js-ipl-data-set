import { deliveries_fun } from "./write_to_json.js";


function player_dismissed_by_bowler(deliveries = []){
   let result =  deliveries.reduce((accumilated , current)=>{

        if(current.player_dismissed){
            accumilated[current.batsman+','+current.bowler] += 1;
        }else {
            accumilated[current.batsman+','+current.bowler] = 1;
        }

        return accumilated;
    },{})
    let max = Number.MIN_VALUE;
    let result_pair = '';
    for(let pair in result){
        if(result[pair] > max){
            max = result[pair]
            result_pair = pair;
        }
    }
    let result_obj = {}
    let obj = result_pair.split(',');
    result_obj[obj[0]] = obj[1];
    return result_obj;
}


deliveries_fun([], player_dismissed_by_bowler , 'player_dismissed_by_other.json');