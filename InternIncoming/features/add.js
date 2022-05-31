function compareVersion(a,b)
{
    
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
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'output.csv',
    header: [
      {id: 'name', title: 'name'},
      {id: 'repo', title: 'repo'},
      {id: 'version', title: 'version'},
      {id: 'version_satisfied', title: 'version_satisfied'},
    ]
  });
//const arr=[];
const answer=[];
var instance="";

function add (task,s) {
    
    
    instance=s.substring(6,12).toString();
    
    fs.createReadStream('./'+task)
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", (row) => {
            
        answer.push({name:row[0],repo:row[1]});
        //arr.push(row[1]);
        })
        .on("end",()=>{
        remaining();
        //output();
        })
   
}

function remaining() {
    answer.forEach((e,i)=>{
        let finalRepoLink=e.repo;
        finalRepoLink=finalRepoLink.replace("github.com","raw.githubusercontent.com");
        finalRepoLink+="master/package.json";
        //console.log(finalRepoLink);
        fetch(finalRepoLink,settings)
            .then(res=>res.json())
            .then((json) => {
                let a1=json["dependencies"]["axios"];
                a1=a1.replace("^","");
                var ans=compareVersion(a1,instance);
                //console.log(a1);
                if(ans===0 || ans===1)
                {
                    ans='True';
                }
                else{
                    ans='False';
                }
                answer[i]={...answer[i],'version':a1,'version_satisfied':ans};
                //console.log(answer);
                csvWriter
                    .writeRecords(answer)
                    
                
                
            })
        
    })

}
       
        
        


module.exports = add;