import matches_fun from "./write_to_json.js";

function matches_per_year(matches=[]){
    let result = {};
    for(let match of matches){
        if(result[match.season]){
            result[match.season] += 1;
        }else {
            result[match.season] = 1;
        }
    }
    return result;
}

matches_fun([],matches_per_year,'maches_per_year.json')
