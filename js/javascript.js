//通过动态添加元素，并记录其id进行添加和删除，再次刷新页面不会保存数据
var todoi=0;
var donei=0;
var todoCount=0;
var doneCount=0;

var dragtemp=null;

function postaction(){
    var str=$('#title').val();
    var li=document.createElement("li");
    li.setAttribute("id","todoli"+todoi);
    li.setAttribute("draggable",'true')
    var checkinput=document.createElement("input");
    checkinput.setAttribute("class","checkboxi");
    checkinput.setAttribute("type","checkbox");
    checkinput.setAttribute("onchange","updatetodo("+todoi+")");
    var inputi=document.createElement("input");
    inputi.setAttribute("id","input"+todoi);
    inputi.setAttribute("class","inputi");
    inputi.setAttribute("type","text");
    inputi.setAttribute("onclick","edittodo("+todoi+")");
    inputi.setAttribute("value",str);
    var ai=document.createElement("a");
    ai.setAttribute("href","javascript:removetodo("+todoi+")");
    li.appendChild(checkinput);
    li.appendChild(inputi);
    li.appendChild(ai);
    $('#todolist').append(li);
    todoi++;
    todoCount++;
    $('#todocount').text(todoCount);
    $('#from')[0].reset();

    var lis=todolist.querySelectorAll("ol li");
    [].forEach.call(lis,function(li){
        li.addEventListener('dragstart',handleDragStart,false);
        li.addEventListener('dragover',handleDragOver,false);
        li.addEventListener('drop',handleDrop,false);
        
    });
}
function edittodo(todoid){
    var inputi=document.getElementById("input"+todoid);
    value=inputi.value;
    inputi.setSelectionRange(0,inputi.value.length);
    inputi.focus;
    inputi.onblur=function(){
        if(inputi.value.length == 0){
            inputi.value=value;
            alert("内容不能为空")
        }
    }
}
function editdone(doneid){
    var inputi=document.getElementById("input"+doneid);
    value=inputi.value;
    inputi.setSelectionRange(0,inputi.value.length);
    inputi.focus;
    inputi.onblur=function(){
        if(inputi.value.length == 0){
            inputi.value=value;
            alert("内容不能为空")
        }
    }
}
function updatetodo(todoid){
    var str=$("#input"+todoid).val();
    var li=document.createElement("li");
    li.setAttribute("id","doneli"+donei)
    li.setAttribute("draggable",'true')
    var checkinput=document.createElement("input");
    checkinput.setAttribute("class","checkboxi");
    checkinput.setAttribute("type","checkbox");
    checkinput.setAttribute("onchange","updatedone("+donei+")");
    checkinput.setAttribute("checked","checked");
    var inputi=document.createElement("input");
    inputi.setAttribute("id","input"+donei);
    inputi.setAttribute("class","inputi");
    inputi.setAttribute("type","text");
    inputi.setAttribute("onclick","edittodo("+donei+")");
    inputi.setAttribute("value",str);
    var ai=document.createElement("a");
    ai.setAttribute("href","javascript:removedone("+donei+")");
    donei++;
    doneCount++;
    li.appendChild(checkinput);
    $('#donecount').text(doneCount);
    li.appendChild(inputi);
    li.appendChild(ai);
    $('#donelist').append(li);
    removetodo(todoid);
}
function updatedone(doneid){
    var str=$("#input"+doneid).val();
    var li=document.createElement("li");
    li.setAttribute("id","todoli"+todoi);
    li.setAttribute("draggable",'true')
    var checkinput=document.createElement("input");
    checkinput.setAttribute("class","checkboxi");
    checkinput.setAttribute("type","checkbox");
    checkinput.setAttribute("onchange","updatetodo("+todoi+")");
    var inputi=document.createElement("input");
    inputi.setAttribute("id","input"+todoi);
    inputi.setAttribute("class","inputi");
    inputi.setAttribute("type","text");
    inputi.setAttribute("onclick","editdone("+todoi+")");
    inputi.setAttribute("value",str);
    var ai=document.createElement("a");
    ai.setAttribute("href","javascript:removetodo("+todoi+")");
    li.appendChild(checkinput);
    li.appendChild(inputi);
    li.appendChild(ai);
    $('#todolist').append(li);
    donei++;
    todoCount++;
    $('#todocount').text(todoCount);
    removedone(doneid);
}
function removetodo(todonum){
    $('#todoli'+todonum).remove();
    todoCount--;
    $('#todocount').text(todoCount);
}
function removedone(doneid){
    $('#doneli'+doneid).remove();
    doneCount--;
    $('#donecount').text(doneCount);
}
function clear(){
    $('#todolist').html("");
    $('#donelist').html('');
    todoCount=0;
    doneCount=0;
    $('#todocount').text(todoCount);
    $('#donecount').text(doneCount);
}



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