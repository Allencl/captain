import store from 'store';



/**
 * symbol Array 
 * @param {*} filename 
 */
const GlobalSymbol = [

];

/**
 * 
 * @param {* from public} filename 
 */
async function asyncGetDataFromPublic(filename) {

    // get json 
    function getJSON(filename) {
        return new Promise((resolve)=>{

            fetch(filename, {
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                  },
            })
            //解析为Promise
            .then(response =>{

                if( response['status']===404 ){
                    alert('文件不存在！');
                    return [];
                }

                return response.json();
            }) 
            .then(data => {
                resolve(data);     
            });   

        });
    }

    let data = await getJSON(filename);
    return {data:data};  
}

/**
 * async 格式化 CSV to json
 * @param {*} file 
 */
async function asyncFormatCSVToJSON(file){

    // csv to json 
    function formatCSVToJSON(file) {
        return new Promise((resolve)=>{
            let reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
        
            reader.onload = function (ev) {
        
                let arr = reader.result.split(/\s+/);
                let tittle = arr.filter(o=>/<.+>/gi.test(o));
        
                let newData = [];
                let len = tittle['length'];
                for(var i=0;i<arr.length;i+=len) {
                    if( (i===0) || (i===arr['length']-1) ) continue;
                    newData.push(arr.slice(i,i+len));
                }
                
                let resultData = newData.map((o,i)=>{
                    var json={};
                    o.map((j,k)=> json[tittle[k]]=j );
                    return json;
                });
                resolve(resultData);
            };  
        });
    }

    let data = await formatCSVToJSON(file);
    return {data:data};
}


/**
 * 全局 lodding
 */
 async function globalLoadingUpdate(active){
    store.dispatch({
        type: 'update_global_spin',
        value: active
    });
}



export {GlobalSymbol,asyncFormatCSVToJSON,asyncGetDataFromPublic,globalLoadingUpdate};

// module.exports = {
//     GlobalSymbol:GlobalSymbol,
//     asyncFormatCSVToJSON:asyncFormatCSVToJSON,    
//     asyncGetDataFromPublic:asyncGetDataFromPublic
// }