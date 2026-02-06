// ---------- DATA ----------
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let personalTasks = JSON.parse(localStorage.getItem("personalTasks")) || [];
let mood = "";
let productivity = 0;

// ---------- MAIN TASK ----------
function addTask(){
    let text = taskInput.value;
    let priority = document.getElementById("priority").value;
    if(text==="") return;

    tasks.push({text, priority, done:false});
    taskInput.value="";
    saveData();
    displayTasks();
}

function displayTasks(){
    taskList.innerHTML="";
    tasks.forEach((task,i)=>{
        let li=document.createElement("li");
        li.className = task.done ? "completed" : "";

        li.innerHTML=`
        <span class="priority-${task.priority.toLowerCase()}">
            ${task.text} (${task.priority})
        </span>
        <div>
            <input type="checkbox" ${task.done?"checked":""} onclick="toggleDone(${i})">
            <button onclick="editTask(${i})">Edit</button>
            <button onclick="deleteTask(${i})">X</button>
        </div>`;
        taskList.appendChild(li);
    });
    updateSummary();
}

function toggleDone(i){
    tasks[i].done=!tasks[i].done;
    saveData();
    displayTasks();
}

function deleteTask(i){
    tasks.splice(i,1);
    saveData();
    displayTasks();
}

function editTask(i){
    let t=prompt("Edit task:",tasks[i].text);
    if(t){
        tasks[i].text=t;
        saveData();
        displayTasks();
    }
}

// ---------- PERSONAL TASK ----------
function addPersonal(){
    let text=personalInput.value;
    if(text==="") return;
    personalTasks.push(text);
    personalInput.value="";
    saveData();
    displayPersonal();
}

function displayPersonal(){
    personalList.innerHTML="";
    personalTasks.forEach((t,i)=>{
        let li=document.createElement("li");
        li.innerHTML=`
        ${t}
        <div>
            <button onclick="removePersonal(${i})">X</button>
        </div>`;
        personalList.appendChild(li);
    });
}

function removePersonal(i){
    personalTasks.splice(i,1);
    saveData();
    displayPersonal();
}

// ---------- MOOD ----------
function setMood(emoji){
    let name="";
    if(emoji==="😄") name="Very Happy";
    else if(emoji==="🙂") name="Happy";
    else if(emoji==="😐") name="Neutral";
    else if(emoji==="😔") name="Sad";
    else name="Very Sad";

    mood=emoji+" "+name;
    moodResult.innerText="Today's Mood: "+mood;
    saveData();
    updateSummary();
}

// ---------- PRODUCTIVITY ----------
function updateProductivity(){
    let slider = document.getElementById("productivity");
    productivity = slider.value;

    document.getElementById("prodValue").innerText = productivity + "%";
    saveData();
    updateSummary();
}

// ---------- SUMMARY ----------
function updateSummary(){
    let completed=tasks.filter(t=>t.done).length;
    summaryBox.innerHTML=`
    Total Tasks: ${tasks.length}<br>
    Completed: ${completed}<br>
    Mood: ${mood || "Not set"}<br>
    Productivity: ${productivity}%
    `;
}

// ---------- SAVE ----------
function saveData(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
    localStorage.setItem("personalTasks",JSON.stringify(personalTasks));
}

// ---------- RESET ----------
function resetDay(){
    if(confirm("Start new day?")){
        tasks=[];
        personalTasks=[];
        mood="";
        productivity=0;
        localStorage.clear();
        location.reload();
    }
}

// ---------- LOAD ----------
displayTasks();
displayPersonal();