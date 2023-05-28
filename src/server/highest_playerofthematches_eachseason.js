
import matches_fun from "./write_to_json.js";

function highest_playerofmatches_eachseason(matches = []){
    let result_obj = {};
    for(let match of matches){
        if(result_obj[match.season]){
            if(result_obj[match.season][match.player_of_match]){
                result_obj[match.season][match.player_of_match] += 1;
            }else {
                result_obj[match.season][match.player_of_match] = 1;
            }
        }
        else {
            result_obj[match.season] = {};
            result_obj[match.season][match.player_of_match] = 1;
        }
    }

    for(let year in result_obj){
        const player_list = Object.entries(result_obj[year]);
        
        player_list.sort((p1,p2)=>{
            if(p1[1] > p2[1]){
                return -1;
            }else if(p1[1] < p2[1]){
                return 1;
            }else return 0;
        });

        result_obj[year] = player_list[0];
    }
    return result_obj;
}

matches_fun([],highest_playerofmatches_eachseason,'highest_playerofthematch.json');