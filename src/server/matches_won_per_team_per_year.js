
import matches_fun from './write_to_json.js';

function matches_won_perseason_eachteam (matches = []){
    let result_obj = {};

    for(let match of matches){
        if(result_obj[match.season]){
            if(result_obj[match.season][match.winner]){
                result_obj[match.season][match.winner] += 1;
            }else {
                result_obj[match.season][match.winner] = 1;
            }
        }else {
            result_obj[match.season] = {};
            result_obj[match.season][match.winner] = 1;
        }
    }

    return result_obj;
}

matches_fun([],matches_won_perseason_eachteam,'matches_won_perseason.json');