// import '../styles/style.css';

const firstScreen = document.getElementById('first_screen');
const mainScreen = document.getElementById('main_screen');

const enterPage = document.querySelector('.authentification');
const regPage = document.querySelector('.registration');

const regLink = document.querySelector('.registration_link');
const regBtn = document.getElementById('registrate_btn');
const enterBtn = document.getElementById('enter_btn');
const exitBtn = document.querySelector('.exit');
const table = document.querySelector('.clients_table');


const enterUsername = document.getElementById('enter_username');
const enterPassword = document.getElementById('enter_password');
const regUsername = document.getElementById('reg_username');
const regPassword = document.getElementById('reg_password');
const regPasswordCheck = document.getElementById('reg_password_check');

const mainTab = document.getElementById('main');
const clientsTab = document.getElementById('clients');
const mapTab = document.getElementById('map');

let usersArray = [];
class newUser {
    constructor(userName, password) {
        this.userName = userName;
        this.password = password;
    }
}

function openRegForm() {
    enterPage.style.display = "none";
    regPage.style.display = "flex";
}

function registrate() {

    let user = new newUser(regUsername.value, regPassword.value);
    usersArray.push(user);
    regPage.style.display = "none";
    enterPage.style.display = "flex";
}

const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

function checkInputs() {
    if (enterUsername.value !== "" && enterPassword.value !== "") {
        enterBtn.classList.remove('disabled');
        enterBtn.removeAttribute('disabled');
        document.querySelector('.errorMessageEmail').style.display = "none";
        document.querySelector('.errorMessagePass').style.display = "none";
    } else {
        if(enterUsername.value === "") {
            document.querySelector('.errorMessageEmail').style.display = "inline";
        } else if (enterPassword.value === "") {
            document.querySelector('.errorMessagePass').style.display = "inline";
        }
        enterBtn.classList.add('disabled');
        enterBtn.setAttribute('disabled', 'true');
    }
}

function checkRegInputs() {
    if (regUsername.value !== "" && regPassword.value !== "" && regPasswordCheck.value !== "") {
        regBtn.classList.remove('disabled');
        regBtn.removeAttribute('disabled');
        document.querySelector('.errorMessageEmail').style.display = "none";
        document.querySelector('.errorMessagePass').style.display = "none";
    } else {
        if(regUsername.value === "") {
            document.querySelector('.errorMessageEmail').style.display = "inline";
        } else if (regPassword.value === "") {
            document.querySelector('.errorMessagePass').style.display = "inline";
        } else if (regPasswordCheck.value === "") {
            document.querySelector('.errorMessagePass').style.display = "inline";
        }
        regBtn.classList.add('disabled');
        regBtn.setAttribute('disabled', 'true');
    }
}

function enterApp() {

    if(localStorage.getItem('email') === null && localStorage.getItem('password') === null) {
        for (let i = 0; i < usersArray.length; i++) {
            if(usersArray[i].userName === enterUsername.value) {
                if(usersArray[i].password === enterPassword.value) {
                    localStorage.setItem('email', enterUsername.value);
                    localStorage.setItem('password', enterPassword.value);
                    firstScreen.style.display = 'none';
                    mainScreen.style.display = 'block';
                }
            } else {
                alert("There's no such a user");
            }
        }
       
        if(usersArray.length === 0) {
            alert("There's no such a user");
        }

      } else {
        enterUsername.value = localStorage.getItem('email');
        enterPassword.value = localStorage.getItem('name');
        firstScreen.style.display = 'none';
        mainScreen.style.display = 'block';
      }
    
}

function exit() {
        firstScreen.style.display = 'block';
        mainScreen.style.display = 'none';
}




const system = document.querySelector('.system');
const browser = document.querySelector('.use');

const str = navigator.userAgent;
const arr = str.split(' ');

let firstElementArr;
let lastElementArr;
for (let i = 0; i < arr.length; i++) {
  if (arr[i].match(/\(/)) {
    firstElementArr = i;
    continue;
  }

  if (arr[i].match(/\)/)) {
    lastElementArr = i + 1;
    break;
  }
}

const compSoft = arr.slice(firstElementArr, lastElementArr).join(' ');
system.append(compSoft);


for (let i = 0; i < arr.length; i++) {
  const opera = /OPR/i;
  const firefox = /Firefox/i;
  const chrom = /Chrome/i;
  const safari = /Safari/i;
  const edg = /Edg/i;

  const operaCheck = str.match(opera);
  const safariCheck = str.match(chrom);

  if (arr[i].match(opera)) {
    browser.append(arr[i]);
  } else if (arr[i].match(firefox)) {
    browser.append(arr[i]);
  } else if (arr[i].match(chrom) && !operaCheck) {
    browser.append(arr[i]);
  } else if (arr[i].match(safari) && !safariCheck) {
    browser.append(arr[i]);
  } else if (arr[i].match(edg)) {
    browser.append(arr[i]);
  }
}

//--------------------
async function createClientsTable() {
    let response = await fetch('https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json');

    let json = await response.json();   
    
    let tr = document.createElement('tr');
        
        let thName = document.createElement('th');
        let thCompany = document.createElement('th');
        let thEmail = document.createElement('th');
        let thPhone = document.createElement('th');
        let thBalance = document.createElement('th');
        let thDate = document.createElement('th');

        thName.innerHTML = "Имя";
        thCompany.innerHTML = "Компания";
        thEmail.innerHTML = "Почта";
        thPhone.innerHTML = "Телефон";
        thBalance.innerHTML = "Баланс";
        thDate.innerHTML = "Дата регистрации";

        tr.append(thName);
        tr.append(thCompany);
        tr.append(thEmail);
        tr.append(thPhone);
        tr.append(thBalance);
        tr.append(thDate);
        tr.style.background = '#c3c3c4';
        table.append(tr);

    for(let i = 0; i < json.length; i++) {
        let tr = document.createElement('tr');
        
        let tdName = document.createElement('td');
        let tdCompany = document.createElement('td');
        let tdEmail = document.createElement('td');
        let tdPhone = document.createElement('td');
        let tdBalance = document.createElement('td');
        let tdDate = document.createElement('td');

        let str = json[i].registered.substr(0, 10);
        let ms = Date.parse(str);
        console.log(Date.parse(json[i].registered));
        let date = new Date(ms);
        let day = date.getDate();
        day = +day > 9 ? day : `0${day}`;
        let month = date.getMonth() + 1;
        month = +month > 9 ? month : `0${month}`;
        let year = date.getFullYear();

        tdName.innerHTML = json[i].name;
        tdCompany.innerHTML = json[i].company;
        tdEmail.innerHTML = json[i].email;
        tdPhone.innerHTML = json[i].phone;
        tdBalance.innerHTML = json[i].balance;
        tdDate.innerHTML = `${day}:${month}:${year}`;
        tdDate.style.position = 'relative';


        let btn = document.createElement('button');
        btn.innerHTML = 'X';
        btn.classList.add('delete');
        tdDate.append(btn);

        tr.append(tdName);
        tr.append(tdCompany);
        tr.append(tdEmail);
        tr.append(tdPhone);
        tr.append(tdBalance);
        tr.append(tdDate);
        

        // if(json[i].isActive) {
        //     tr.style.background = 'white';
        // } else {
        //     tr.style.background = '#dee0e2';
        // }
        table.append(tr);


    }

    let extraInfo = document.createElement('div');
    extraInfo.classList.add('extraInfo');

    let men = document.createElement('div');
    let women = document.createElement('div');
    let balance = document.createElement('div');

    let menAmount = 0;
    let womenAmount = 0;
    let maxBalance = 0;
    for (let i = 0; i < json.length; i++) {
        if(json[i].gender == 'male') {
            menAmount++;
        } else if(json[i].gender == 'female') {
            womenAmount++;
        } 
        let balance = json[i].balance.slice(1).split('');
        for (let i = 0; i < balance.length; i++) {
            if(balance[i] === ',') {
                balance.splice(i, 1);
            }
        }

        if(+balance.join('') > maxBalance) {
            maxBalance = +balance.join('');
        }
        
    }

    men.innerHTML = `<span>Количество мужчин:</span> ${menAmount}`;
    women.innerHTML = `<span>Количество женщин:</span> ${womenAmount}`;
    balance.innerHTML = `<span>Максимальный баланс:</span> ${maxBalance}$`;

    extraInfo.append(men);
    extraInfo.append(women);
    extraInfo.append(balance);

    clientsTab.append(extraInfo);

    clientsTab.append(table);
}

function deleteRow(event) {
    if (event.target.className != 'delete') {
        return;
    } else {
        let  confirmDelete = confirm('Вы действительно хотите удалить эту сроку?');
        if(confirmDelete) {
            let tr = event.target.closest('tr');
            tr.remove();

            let infoMessage = document.createElement('div');
            let infoExit = document.createElement('span');

            infoMessage.classList.add('infoMessage');
            infoMessage.innerHTML = 'Строка успешно удалена';

            infoExit.classList.add('infoExit');
            infoExit.innerHTML = 'X';

            infoMessage.append(infoExit);
            mainScreen.append(infoMessage);

            infoExit.onclick = function() {
                infoMessage.style.display = 'none';
            }
}           
        }
    }
    






regLink.addEventListener('click', openRegForm);
regBtn.addEventListener('click', registrate);
enterBtn.addEventListener('click', enterApp);
exitBtn.addEventListener('click', exit);
table.addEventListener('click', deleteRow);
enterUsername.addEventListener('change', checkInputs);
enterPassword.addEventListener('change', checkInputs);
regUsername.addEventListener('change', checkRegInputs);
regPassword.addEventListener('change', checkRegInputs);
regPasswordCheck.addEventListener('change', checkRegInputs);


createClientsTable();



function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 3,
      center: {lat: 53.89979378678366, lng: 27.55869137841202},
    });

    //массив координат
    const bounds = [
        {lat: 55.7522200, lng: 37.6155600},
        {lat: 53.89979378678366, lng: 27.55869137841202},
        {lat: 50.4546600, lng: 30.5238000},
        {lat: 54.6891600, lng: 25.2798000},//
        {lat: 52.5243700, lng: 13.4105300},//
        {lat: 41.8919300, lng: 12.5113300},//
        {lat: 52.4345000, lng: 30.9754000},//
        {lat: 53.9168000, lng: 30.3449000},
        {lat: 55.1904000, lng: 30.2049000},
        {lat: 40.4165000, lng: -3.7025600},
        {lat: 42.6975100, lng: 23.3241500},
        {lat: 37.9794500, lng: 23.7162200},
    ];


    //сообщения по клику на маркер
    const secretMessages = ["Москва", "Минск",
    "Киев", "Вильнюс", "Берлин", 'Рим',
    'Гомель', 'Могилев', 'Витебск', 'Мадрид',
    'София', 'Афины'];
    

    for (let i = 0; i < secretMessages.length; ++i) {
      const marker = new google.maps.Marker({
        position: bounds[i],
        map: map,
      });
      attachSecretMessage(marker, secretMessages[i]);
    }
  }

  // Attaches an info window to a marker with the provided message. When the
  // marker is clicked, the info window will open with the secret message.
   function attachSecretMessage(marker, secretMessage) {
    const infowindow = new google.maps.InfoWindow({
      content: secretMessage,
    });
    marker.addListener("click", () => {
      infowindow.open(marker.get("map"), marker);
    });
  }
  
  window.initMap = initMap;