//参考源码，进行修改

window.onload=load();

function load(){
    var todolist=document.getElementById("todolist");
    var donelist=document.getElementById("donelist");
    var collection=localStorage.getItem("todo");
    var todocount=document.getElementById("todocount");
    var donecount=document.getElementById("donecount");
    if(collection!="[]"&&collection!=null){
        var data=JSON.parse(collection);
        var todoCount =0;
        var doneCount =0;
        var todoString ="";
        var doneString ="";
        for(var i =0; i<data.length;i++){
            if(data[i].done){
                doneString+=" <li draggable=\"true\">\
                <input class=\"checkboxi\" type=\"checkbox\" onchange=\"update("+i+",'done',false)\" checked='checked'>\
                <input id=\"input"+i+"\" class=\"inputi\" type=\"text\" onclick=\"edit("+i+")\" value=\""+data[i].title+"\" >\
                <a href='javascript:remove("+i+")'>-</a>\
                </li>"
                doneCount++;
            }
            else{
                todoString+=" <li draggable=\"true\">\
                <input class=\"checkboxi\" type=\"checkbox\" onchange=\"update("+i+",'done',true)\" >\
                <input id=\"input"+i+"\" class=\"inputi\" type=\"text\" onclick=\"edit("+i+")\" value=\""+data[i].title+"\">\
                <a href='javascript:remove("+i+")'>-</a>\
                </li>";
                todoCount++;
            }
            todocount.innerHTML=todoCount;
            todolist.innerHTML=todoString;
            donecount.innerHTML=doneCount;
            donelist.innerHTML=doneString;
        }
    }
    else{
		todocount.innerHTML=0;
		todolist.innerHTML="";
		donecount.innerHTML=0;
		donelist.innerHTML="";
	}
    var lis=todolist.querySelectorAll("ol li");
    [].forEach.call(lis,function(li){
        li.addEventListener('dragstart',handleDragStart,false);
        li.addEventListener('dragover',handleDragOver,false);
        li.addEventListener('drop',handleDrop,false);

    });
}
function clear(){
    localStorage.clear();
    load();
}
function update(i,field,value){
    var data =loadData();
    var todo=data.splice(i,1)[0];
    todo[field]=value;
    data.splice(i,0,todo);
    saveData(data);
    load();
    
}
function loadData(){
    var collection = localStorage.getItem("todo");
    if(collection!=null){
        return JSON.parse(collection);
    }
    else return [];
}
function saveData(data){
    localStorage.setItem("todo",JSON.stringify(data));
}
function edit(i){
    var inputi=document.getElementById("input"+i);
    value=inputi.value;
    inputi.setSelectionRange(0,inputi.value.length);
    inputi.focus;
    inputi.onblur=function(){
        if(inputi.value.length == 0){
            inputi.value=value;
            alert("内容不能为空")
        }
        else{
            update(i,"title",inputi.value);
        }
    }
}
function postaction(){
    var title=document.getElementById("title");
    var data=loadData();
    var todo ={"title":title.value,"done":false}
    data.push(todo);
    saveData(data);
    var from = document.getElementById("from");
    from.reset();
    load();
}
function remove(i){
    var data=loadData();
    var asd = data.splice(i,1)[0];
    saveData(data);
    load();
}
var dragtemp=null;
function handleDragStart(e){
    
    dragtemp=this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text',this.innerHTML);
}
function handleDragOver(e){
    if(e.preventDefault){
        e.preventDefault();
    }
    e.dataTransfer.dropEffect='move';
    return false;
}
function handleDrop(e){
    if(e.stopPropagation){
        e.stopPropagation();
    }
    if(dragtemp!=this){
        dragtemp.innerHTML=this.innerHTML;
        this.innerHTML=e.dataTransfer.getData('text');

    }
    return false;
}