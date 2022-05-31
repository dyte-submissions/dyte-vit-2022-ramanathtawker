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
//const arr=[];
const answer=[];
function add (task) {
    fs.createReadStream('./sampleInput.csv')
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", (row) => {
            
            answer.push({name:row[0],repo:row[1]});
        //arr.push(row[1]);
        })
        .on("end",()=>{
            answer.forEach((e,i) => {
                
                arr[i]=e.replace("github.com","raw.githubusercontent.com");
                //arr[i]=e+"master/package.json";
            })
            arr.forEach((e,i) => {
                arr[i]=e+"master/package.json";
                //arr[i]=e+"master/package.json";
            })
            arr.forEach((e)=>{
                let url=e;
                //console.log(url);
                fetch(url,settings)
                    .then(res=>res.json())
                    .then((json) => {
                        let a1=json["dependencies"]["axios"];
                        var ans=compareVersion(a1,"0.23.0");
                        if(ans===0 || ans===1)
                        {
                            // ans="True";
                            // answer["url"]=url;
                            // answer["version"]=a1;
                            // answer["version_satisfied"]=ans;
                            
                            console.log(answer);
                        }
                        
                    });
            })
            
        })
        
        
}

module.exports = add;