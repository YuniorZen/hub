
/**

获取项目字型集，便于压缩字体库
放在项目目录下，cmd运行: node getFonts.js

*/

let fs=require('fs'),
    files,
    content=[];

//获取文件列表(.vue|html|js|json)可添加需要文件类型
let  getFiles=function(dir,exclude) {
    let results = [];
    let  list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        let stat = fs.statSync(file);
        if(stat&& stat.isDirectory()){           
            results = results.concat(getFiles(file))
        }else{
            if(/.(vue|html|js|json)$/.test(file)){
                results.push(file)
            }    
        } 
    });
    return results
};

((dir)=>{
    files=getFiles(dir);
    files.forEach(file=>{
        let text=fs.readFileSync(file);
        text.toString().split('').forEach(letter=>{
            if(/[\u4e00-\u9fa5]/.test(letter)&&content.indexOf(letter)==-1){
                content.push(letter);
            }
        })    
    })
    //打印项目用到的所有字型集
    console.log(content.join(''));
})('./src'); //相对node运行目录下的项目地址


