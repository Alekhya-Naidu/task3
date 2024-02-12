
var tab = document.getElementById('empTable');
const tableBody = document.getElementById('tBody');

//  sidebar functionality
var sidebar_var = true;
function openSidebar(){
    document.getElementById("empSideBar").style.width = "15%";
    document.getElementById("mainBody").style.width = "85%";
    const miniIcon = document.querySelector(".minimised-icons");
    miniIcon.style.display = "none";
    const sideBar = document.querySelector(".sidebar");
    sideBar.style.display = "block";
    rotateImage();           
}

function rotateImage() {
    var handle_icon = document.querySelector('.handle-icon');
    if(sidebar_var)
        handle_icon.style.rotate = '180deg';
    else
        handle_icon.style.rotate = '0deg';
}

function closeSidebar(){
    const sb = document.querySelector(".sidebar");
    document.getElementById("mainBody").style.width = "100%";
    const miniIcon = document.querySelector(".minimised-icons");
    miniIcon.style.display = "flex";
    miniIcon.style.flexDirection = "column";
    sb.style.display = "none";
    rotateImage();
}

function SideBar(){
    if(sidebar_var == false){
        openSidebar();
    }else{
        closeSidebar();
    }
    sidebar_var = !sidebar_var;
}

// Employee dropdown in Employee
var empDropDown_var = true;
function EmpInfo(){
    if(empDropDown_var == true){ //Open employee innerlist
        const emp = document.querySelector(".all-list");
        emp.style.display = "block";    
    }
    else{ //Close epmloyee
        const emp = document.querySelector(".all-list");
        emp.style.display = "none"; 
    }
    empDropDown_var = !empDropDown_var;
}

// Filter bar in employees
var filterBar_var = true;
function FilterBar(){
    if(filterBar_var == true){  //Closing the filter bar
        const filterBar = document.querySelector(".filter");
        filterBar.style.display = "none";
    }
    else{ //Opening the filter bar
        const filterBar = document.querySelector(".filter");
        filterBar.style.display = "flex";
    }
    filterBar_var = !filterBar_var;
}

// Dropdown in Add roles
var rolesDropDown_var = true;
function DropDown(){
    if(rolesDropDown_var == true){  //Opening Dropdown
        const dropDown = document.querySelector(".dropdown");
        dropDown.style.display = "block";
    }
    else{ //Closing Dropdown
        const dropDown = document.querySelector(".dropdown");
        dropDown.style.display = "none";
    }
    rolesDropDown_var = !rolesDropDown_var;
}

//sorting thr table asc, desc order
let sortOrders = {};
function sortColumn(col) {
    const tbody = tab.querySelector('#tBody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    if(!sortOrders[col] || sortOrders[col] == 'desc'){
        rows.sort((a, b) => {
            const cellA = a.cells[col].textContent.trim();
            const cellB = b.cells[col].textContent.trim();
            if(isNaN(cellA) && isNaN(cellB)){
                return cellA.localeCompare(cellB);
            } 
            else{
                return parseInt(cellA) - parseInt(cellB);
            }
        });
        sortOrders[col] = 'asc';
    } 
    else {
        rows.sort((a, b) => {
            const cellA = a.cells[col].textContent.trim();
            const cellB = b.cells[col].textContent.trim();
            if(isNaN(cellA) && isNaN(cellB)){
                return cellB.localeCompare(cellA);
            } 
            else{
                return parseInt(cellB) - parseInt(cellA);
            }
        });
        sortOrders[col] = 'desc';
    }
    tbody.innerHTML = '';
    rows.forEach(rowdata => tbody.appendChild(rowdata));
}

// filter the rows based on alphabets
function getContent(letter) {
    const emp = employees.filter(employee => {
        const userName = employee.firstName.charAt(0).toUpperCase();
        return userName === letter;
    });
    displayFilterData(emp);
}
function displayFilterData(filteredData) {
    tableBody.innerHTML = ''; 

    if(filteredData.length > 0){
        filteredData.forEach(employee => {
            const row = createRow(employee);
            tableBody.appendChild(row);
        });
    }
    else{
        tableBody.style.fontFamily = "Public Sans, sans-serif";
        tableBody.style.fontSize = "12px";
        tableBody.innerHTML = 'No data available for your filter';
    }
}

function displayAllData(){
    tableBody.innerHTML = '';
    employees.forEach(employee => {
        const row = createRow(employee);
        tableBody.appendChild(row);
    });
}

//filer based on status, loc, dept
document.addEventListener('DOMContentLoaded', function(){
    const appltBtn = document.querySelector('.filter-btn .apply');
    const resetBtn = document.querySelector('.filter-btn .reset');
    appltBtn.addEventListener('click', applyFilter);
    resetBtn.addEventListener('click', resetFilter);
});
function applyFilter(){
    const stat = document.querySelector('select[name="status"]').value;
    const loc = document.querySelector('select[name="location"]').value;
    const dept = document.querySelector('select[name="department"]').value;
    console.log(employees);
    const filteredData = employees.filter(employee => {
        console.log(employee);
        if((employee.status == stat) && (employee.location == loc) && (employee.department == dept)) 
            return true;
        else
           console.log("false");
    });
    console.log(filteredData);
    displayFilterData(filteredData);
}
function resetFilter(){
    document.querySelector('select[name="status"]').selectedIndex = 0;
    document.querySelector('select[name="location"]').selectedIndex = 0;
    document.querySelector('select[name="department"]').selectedIndex = 0;
    displayAllData();
}

//validations for inputs
function validateEmail(mail) {
    return mail.includes("@") && mail.includes(".");
}
function validateMobileNumber(number) {
    return !isNaN(number) && number.length === 10;
}

// Inputs functions of add-employee
let employees = JSON.parse(localStorage.getItem('employees')) || [];
function addEmp() {
    const empNo = document.getElementById('empNum').value;
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('mail').value;
    const mobileNumber = document.getElementById('number').value;
    const joinDate = document.getElementById('jdate').value;
    const location = document.getElementById('location').value;
    const role = document.getElementById('Role').value;
    const department = document.getElementById('department').value;
    const manager = document.getElementById('manager').value;
    const project = document.getElementById('project').value;

    if (!validateMobileNumber(mobileNumber)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }
    if (!validateEmail(email)) {
        alert("Please enter a valid mailId");
        return;
    }
    
    const employee = {
        empNo, firstName, lastName, dob, email, mobileNumber, joinDate, location, 
        role, department, manager, project, status : 'Active'
    };
    
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));

    window.alert("New employee has been added successfully");
    tableBody.appendChild(newRow);

    document.querySelectorAll(".emp-row-content input").forEach(input => {
        input.value = '';
    });
}

//creating each row in the table
function createRow(employee){
    const row = document.createElement('tr');
    row.classList.add('table-data');
    const rowdata = [
        createBox(),
        createUser(employee),
        createLoc(employee.location),
        createLoc(employee.department),
        createLoc(employee.role),
        createLoc(employee.empNo),
        createStatus('Active'),
        createJdate(employee.joinDate),
        createMore()
    ]
    row.style.position = "relative";
    rowdata.forEach(rowd => {
        row.append(rowd);
    }); 
    return row;
}

window.onload = () => {
    employees.forEach(employee => {
        const row = createRow(employee);
        tableBody.appendChild(row);
    });
}

function createBox(){
    const data = document.createElement('td');
    const inp = document.createElement('input');
    inp.setAttribute('type', 'checkbox');
    data.append(inp);
    return data;
}

document.getElementById('uploadInput').addEventListener('change', handleFileSelect);
function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(ele) {
            const imageSrc = ele.target.result;
            document.getElementById('profileImg').src = imageSrc;
        }
        reader.readAsDataURL(file);
    }
}

function createUser(employee){
    const data = document.createElement('td');
    const image = document.createElement('img');
    image.setAttribute('src', 'assets/Images/man-profile.png');
    image.setAttribute('alt', 'Profile picture of a man');
    data.appendChild(image);

    const userInfo = document.createElement('div');
    userInfo.classList.add('user-info');
    
    const userName = document.createElement('span');
    userName.classList.add('user-name');
    userName.textContent = employee.firstName +" "+ employee.lastName;

    const mailId = document.createElement('span');
    mailId.classList.add('mail-id');
    mailId.textContent= employee.email;

    userInfo.appendChild(userName);
    userInfo.appendChild(mailId);
    data.appendChild(userInfo);
    return data;
}

function createLoc(text){
    const data = document.createElement('td');
    data.innerText = text;
    return data;
}

function createStatus(text){
    const data = document.createElement('td');
    const btn = document.createElement('button');
    btn.textContent = "Active";
    data.appendChild(btn);
    return data;
}

function createJdate(text){
    const data = document.createElement('td');
    data.textContent= text;
    return data;
}

function  createMore(){
    const data = document.createElement('td');
    const image = document.createElement('img');
    image.classList.add('three-dots');
    image.setAttribute('src', 'assets/Images/more-dots.png');
    image.setAttribute('alt', 'image of three dots horizontally');
    data.appendChild(image);
    image.addEventListener('click', MoreOpt);

    const dotOption = document.createElement('div');
    dotOption.style.backgroundColor = "white";
    dotOption.classList.add('dot-option');
    dotOption.setAttribute('id', 'dotOpt');

    const options = ['View Details', 'Edit', 'Delete'];
    options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        dotOption.appendChild(li);
    });

    data.appendChild(dotOption);
    return data;
}

// threedots more option
var opt_var = true;
function MoreOpt(event){
    const dot = event.target.nextElementSibling;
    if(opt_var == true){
        dot.style.display = "block";
        dot.style.position = "absolute";
        dot.style.top = "2rem"; 
        dot.style.zIndex = "";
    }
    else{
        dot.style.display = "none";
    }
    opt_var = !opt_var;
}

//delete the rows in the table
const delBtn = document.querySelector('.delete-btn button');
delBtn.addEventListener('click', deleteCheckedRows);

tableBody.addEventListener('change', function(event){
    if(event.target.type === 'checkbox'){
        deleteButtonCheck(event.target);
    }
});

function deleteButtonCheck(checkbox){
    const deleteOpt = document.querySelector('.delete-btn button');
    if(checkbox.checked){
        deleteOpt.style.backgroundColor = '#F44848';
    }
    else{
        const check = document.querySelectorAll('input[type = "checkbox"]:checked').length > 0;
        if(!check){
            deleteOpt.style.backgroundColor = '#F89191';
        }
    }
}

function deleteCheckedRows(){
    const box = document.querySelectorAll('input[type = "checkbox"]:checked');
    box.forEach(checkbox => {
        const tabrow = checkbox.closest('.table-data');
        const rowheader = tabrow.rowheader - 1;
        tabrow.remove();
        employees.splice(rowheader, 1);
    });
    localStorage.setItem('employees', JSON.stringify(employees));
    const deleteOpt = document.querySelector('.delete-btn button');
    deleteOpt.style.backgroundColor = '#F89191';
}

//Exporting the data into excel sheet
function exportData() {
    var rows = tab.getElementsByTagName('tr');
    var data = [];
    
    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll('td, th');
      for (var j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText);
      }
      data.push(row);
    }
  
    var wb = XLSX.utils.book_new(); //workbook
    var ws = XLSX.utils.aoa_to_sheet(data); //worksheet
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'table_data.xlsx');
}
const exp = document.getElementById('export-btn');
exp.addEventListener('click', exportData);
  


