function compareVersion(a,b)
{
    a=a.replace("^","");
    if (a === b) {
        return 0;
    }
    var a_components = a.split(".");
    var b_components = b.split(".");

    var len = Math.min(a_components.length, b_components.length);

    // loop while the components are equal
    for (var i = 0; i < len; i++) {
        // A bigger than B
        if (parseInt(a_components[i]) > parseInt(b_components[i])) {
            return 1;
        }

        // B bigger than A
        if (parseInt(a_components[i]) < parseInt(b_components[i])) {
            return -1;
        }
    }

    // If one's a prefix of the other, the longer one is greater.
    if (a_components.length > b_components.length) {
        return 1;
    }

    if (a_components.length < b_components.length) {
        return -1;
    }

    // Otherwise they are the same.
    return 0;
}


const fs = require("fs");
const { parse } = require("csv-parse");
const fetch = require('node-fetch');
let settings = {method:"Get"};
const finalRecord=[];
let answer=[];
async function add (task) {
    let x=[];
    fs.createReadStream('./sampleInput.csv')
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", (row) => {
            
            answer.push({name:row[0],repo:row[1]});
        //arr.push(row[1]);
        })
        .on("end",async ()=>{
            answer.forEach((e,i) => {
                let finalRepoLink=e.repo;
                finalRepoLink=finalRepoLink.replace("github.com","raw.githubusercontent.com");
                finalRepoLink+="master/package.json";
                answer[i].repo=finalRepoLink;
                
                
            }) 
            //console.log(answer);
            const res=await Promise.all(answer.map(
                (e) => {
                    return fetch(e.repo,settings)
                }
            ));
            res.map(async (e,i)=> {
                const val=await e.json();
                //(val['dependencies']['axios']);
                x.push ({...answer[i],'version':val['dependencies']['axios']});
                
                
            });
            return x;
        })
        console.log(x);
        
}

module.exports = add;