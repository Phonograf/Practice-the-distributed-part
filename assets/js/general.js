let task = document.getElementById("number");
let lab = document.getElementById("lab");
let launch = document.getElementById("launch");
let stackJS = "";
let clear = document.getElementById("clear");
let feedback = document.getElementById("feedback");
let link;
let debugW;
let safemode;

window.onload = function() { 
    //alert('Страница загружена');
    //Загрузить количество лабораторных работ
    async function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return JSON.parse(xmlHttp.responseText);
    }
    async function psemain(path) {
        let reestr = {};
        reestr = await httpGet("assets/labs/reestr.json");
        document.getElementById("lab").innerHTML = "";
        for (let index = 0; index < reestr.labs.length; index++) {
            document.getElementById("lab").innerHTML += `<option value="${reestr.labs[index].number}">${reestr.labs[index].number}</option>`;
            let labreestr = await httpGet(`assets/labs/${reestr.labs[index].path}`);
            if (index == 0) {
                document.getElementById("number").innerHTML = "";
                for (let j = 0; j < labreestr.modules.length; j++) {
                    document.getElementById("number").innerHTML += `<optgroup id="${labreestr.modules[j].mname}" label="${labreestr.modules[j].mname}">`;
                    for (let i = 0; i < labreestr.modules[j].tasks.length; i++) {
                        document.getElementById("number").innerHTML += `<option value="${labreestr.modules[j].module}-${labreestr.modules[j].tasks[i].tnumber}" path="${labreestr.modules[j].tasks[i].path}">${labreestr.modules[j].tasks[i].tnumber}</option>`

                    }
                    document.getElementById("number").innerHTML += `</optgroup>`;
                }
            }
            
        }
    }
    psemain();
  };

async function loadtask(params) {
    (function () {
        var old = console.log;
        var logger = document.getElementById('log');
        console.log = function (message) {
            if (typeof message == 'object') {
                logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '\n';
            } else {
                logger.innerHTML += message + '\n';
            }
        }
    })();

    console.log(`Loading ${lab.value} - ${task.value}`);
    async function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        try {
            xmlHttp.open("GET", theUrl, false); // false for synchronous request
            xmlHttp.send(null); 
            return JSON.parse(xmlHttp.responseText);
        } catch (error) {
            console.log("error: "+ theUrl);
            return "error"
        }             
    }
    async function httpGetJS(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }
    //Выгрузка метаданных
    let reestr = {};
    reestr = await httpGet("assets/labs/reestr.json");
    let labreestr = await httpGet(`assets/labs/${reestr.labs[lab.value-1].path}`);
    let taska = labreestr.modules[task.value.split("-")[0]-1].tasks[task.value.split("-")[1]-1];
    //ссылки
    link = `assets/labs/${reestr.labs[lab.value-1].pathshort}/${taska.path}`;
    document.getElementById("aa1").href = link;
    document.getElementById("aa2").href = link;
    //metainfo
    document.getElementById("metadata").value = `Лабораторная # ${lab.value} \n Модуль ${task.value.split("-")[0]} \n Задача ${task.value.split("-")[1]} \r\n Описание \n ${taska.taskdescription} \r\n Статус ${taska.status} \r\n Комментарий  -- ${taska.comment}`
    if (taska.gfx == "") {
        document.getElementById("task").innerHTML = taska.taskdescription + "<br>"+"<hr>" + taska.comment;
    }else{
        document.getElementById("task").innerHTML = taska.taskdescription + `<br><img src="assets/labs/${reestr.labs[lab.value-1].pathshort}/${taska.gfx}" style="max-height:100%; max-width:100%"><br>`+"<hr>" + taska.comment;
    }
   if (taska.safemode) {
    safemode = taska.safemode;
   }else{
    safemode = 2000;
   }
    
    //выгрузка скрипта
    stackJS = await httpGetJS(link);
    stackJS = stackJS.substring(344);
    document.getElementById("code").innerHTML = stackJS;

    hljs.highlightAll();

    
}

lab.onclick = async function () {
    let w = lab.value;
    async function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return JSON.parse(xmlHttp.responseText);
    }
        let reestr = {};
        reestr = await httpGet("assets/labs/reestr.json");
            let labreestr = await httpGet(`assets/labs/${reestr.labs[w-1].path}`);
            document.getElementById("number").innerHTML = "";
            for (let j = 0; j < labreestr.modules.length; j++) {
                document.getElementById("number").innerHTML +=`<optgroup id="${labreestr.modules[j].mname}" label="${labreestr.modules[j].mname}">`;
                for (let i = 0; i < labreestr.modules[j].tasks.length; i++) {
                    document.getElementById("number").innerHTML += `<option value="${labreestr.modules[j].module}-${labreestr.modules[j].tasks[i].tnumber}" path="${labreestr.modules[j].tasks[i].path}">${labreestr.modules[j].tasks[i].tnumber}</option>`
                    
                }
                document.getElementById("number").innerHTML +=`</optgroup>`;
            }


}

launch.onclick = async function () {
    window.f1 = "undefined";
    var s = document.createElement('script');
    s.type = 'text/javascript';
    let code = `async function f1(){ 
            var worker = new Worker("${link}");
            var logger = document.getElementById('log');
            worker.onmessage = function(e) {
                if(String(e.data).indexOf("|prompt|")==0){
                    let tempera = prompt(e.data.split("|prompt|")[1],"2");
                    worker.postMessage([tempera]);
                }else{
                    logger.value += e.data + "\\n";
                } 
              }

            setTimeout(function () {
      try {
        throw new Error('Timeout!');
      } catch (e) {
        console.error(e);
        worker.terminate();
      }
    }, ${safemode})
        worker.postMessage("");                 
    }
    f1();`;
    try {
      s.appendChild(document.createTextNode(code));
      document.body.appendChild(s);
    } catch (e) {
      s.text = code;
      document.body.appendChild(s);
    }
}

clear.onclick = async function () {
    document.getElementById('log').value = "";
}

feedback.onclick = async function () {
    window.open(`https://github.com/Phonograf/Labarotory-works-s2-1st-year/issues/new?labels=feedback&title=[lab ${lab.value} : ${task.value}]+New+feedback&body=put+feedback+here+%0A`)
}