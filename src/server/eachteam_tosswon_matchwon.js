import matches_fun from "./write_to_json.js";


function toss_and_match_winner(matches=[]){
    let result_obj = {}
    for (let match of matches){
        if(match.winner === match.toss_winner){
            if(result_obj[match.winner]){
                result_obj[match.winner] += 1;
            }else {
                result_obj[match.winner] = 1
            }
        }
    }
    return result_obj;
}

matches_fun([], toss_and_match_winner , 'teams_tosswon_matchwon.json');

