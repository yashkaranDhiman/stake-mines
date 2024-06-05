let container = document.getElementById("container");
let body = document.body;
let explosionSound = document.getElementById("explosion");
let secret = document.getElementById("secret");
let addForm = document.getElementById("add-form");
let AddModel = document.getElementById("add-model");
let totalProfit= document.getElementById("total-profit");
let WrongPaddMssg = document.getElementById("wrong-passcode-message");
let totalProfitMultiply= document.querySelector("#total-profit h2");
let bigOverlay = document.getElementById("big-overlay");
let lootOverlay = document.getElementById("loot-overlay");
let btn = document.getElementById("btn");
let amt = document.getElementById("amt")
let btn_bomb = document.querySelector("#btn p");
let looseModel = document.getElementById("loose-model");
let winModel = document.getElementById("win-model");
let overlay = document.getElementById("overlay");
let close = document.querySelector(".close");
let lowMoney = document.getElementById("low-money-message");
let totalMoney = document.querySelector("#wallet-main p");
let walletMoney = localStorage.getItem('walletMoney');
totalMoney.innerText = walletMoney;
let inputField = document.querySelector("#amount input");
let gained = document.querySelector("#bottom-win h4");
let mutiplied = document.querySelector("#top-win h2");
let arr = [];
let flag = 0;
let allMines ;
let profit;
let plotmineWork = true;
let betAmount = 0;
let timesProfit = 0;
let previousInputValue = '';
let mutipliedMoney;
let rn1,rn2,rn3;



close.addEventListener("click", () => {
    location.reload()
});
if(localStorage.getItem("walletMoney")){

}
else{
    localStorage.setItem("walletMoney","1000");
}
document.querySelector(".cross").addEventListener("click",()=>{
    AddModel.style.scale = "0"
    bigOverlay.style.display = "none";
})
amt.addEventListener("input", function() {
    previousInputValue = inputField.value;
    if (isNaN(inputField.value)) {
        inputField.value = previousInputValue;
    } else {
        betAmount = Number(inputField.value);
    }
});
addForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(secret.value == "99"){
        let current = Number(localStorage.getItem("walletMoney"));
        let updated = current+Number(amt.value);
        localStorage.setItem("walletMoney",updated)
        location.reload()
    }
    else{
        WrongPaddMssg.style.top = 10+"%"
        bigOverlay.style.display = "block"
        setTimeout(()=>{
            bigOverlay.style.display = "none"  
            WrongPaddMssg.style.top = -10+"%"
        },5000);
    }
})

function calculateProfit(chances, baseProfit) {
    let profit = baseProfit * Math.pow(1.122, chances);
    profit = profit.toFixed(3);
    mutipliedMoney = profit / baseProfit;
    mutipliedMoney = mutipliedMoney.toFixed(2);
    mutiplied.innerText = mutipliedMoney;
    gained.innerText = "$" + profit;
    manageMoney(profit);  
}
function checkBetAmount() {
    betAmount = Number(inputField.value);
    previousInputValue = inputField.value;
    inputField.addEventListener("input", function() {
        if (isNaN(inputField.value)) {
            inputField.value = previousInputValue;
        } else {
            betAmount = Number(inputField.value);  
        }
    });
}
function makeSpaces(){
    let clutter = "";
    for (let i = 0; i < 25; i++) {
        clutter += `<div class="mine" data-number="${i+1}"></div>`
    }
    container.innerHTML = clutter;
    allMines = document.querySelectorAll(".mine");
}
function plotMine() {
    if (looseModel.style.scale === "1") {
        return;
    }

    do {
        rn1 = Math.floor(Math.random() * 25) + 1;
        rn2 = Math.floor(Math.random() * 25) + 1;
        rn3 = Math.floor(Math.random() * 25) + 1;
    } while (rn1 === rn2 || rn1 === rn3 || rn2 === rn3);

    allMines.forEach(m => {
        m.addEventListener("click", (dets) => {
            let target = dets.target;
            if (!arr.includes(target)) {
                arr.push(target);
            }
            let mine = Number(target.getAttribute("data-number"));
            if (rn1 == mine||rn2 == mine||rn3 == mine) {
                m.style.backgroundImage = "url('bomb.png')";
                blast()
                let currentWalletMoney = Number(localStorage.getItem('walletMoney'));
                let updatedWalletMoney = (currentWalletMoney - betAmount).toFixed(3);
                if (updatedWalletMoney < 0) {
                    bigOverlay.style.display = "block";
                    lowMoney.style.top = 10+"%"
                    return; 
                }
                localStorage.setItem('walletMoney', updatedWalletMoney);
                totalMoney.innerText = updatedWalletMoney;  
                looseModel.style.scale = 1;
                overlay.style.display = "block";
            }
            else{
                setTimeout(()=>{
                    m.style.backgroundImage = "url('gem.png')";
                    m.style.backgroundColor = "#06182";
                },250)
            }
            totalProfitMultiply.innerText = mutipliedMoney;
        });
    });
}
function scaling(){
    document.querySelectorAll(".mine").forEach(m=>{
        m.addEventListener("click",()=>{
            m.style.animation = `anime 0.4s ease-in-out 1 forwards`;
        })
    })
}

function workingBtn() {
    if (plotmineWork) {
        btn.addEventListener("click", () => {
            if (winModel.style.scale === "1" || looseModel.style.scale === "1") {
                return; 
            }

            if (flag == 0) {
                totalProfit.style.display = "block";
                btn_bomb.innerHTML = `<img src="btn.png" alt="">`;
                flag = 1;
                plotMine();
                scaling();
                lootOverlay.style.display = "block";
                let currentWalletMoney = Number(localStorage.getItem('walletMoney'));
                if (betAmount > currentWalletMoney || betAmount == 0    ) {
                    lowMoney.style.top = "10%";
                    bigOverlay.style.display = "block";
                    return; 
                }
            } else {
                totalProfit.style.display = "none";
                let currentWalletMoney = Number(localStorage.getItem('walletMoney'));
                if (betAmount > currentWalletMoney) {
                    bigOverlay.style.display = "block";
                    lowMoney.style.top = "10%";
                    return; 
                }


                let updatedWalletMoney = (currentWalletMoney - betAmount).toFixed(3);
                if (updatedWalletMoney < 0) {
                    lowMoney.style.top = "10%";
                    close.addEventListener("click", () => {
                        lowMoney.style.top = "-20%";
                        
                    });
                    return;
                }

                localStorage.setItem('walletMoney', updatedWalletMoney); 
                totalMoney.innerText = updatedWalletMoney;   

                btn_bomb.innerHTML = `
                <p>Bet</p>
                `;
                flag = 0; 
                winModel.style.scale = 1;
                plotmineWork = false;
                lootOverlay.style.display = "none";
                overlay.style.display = "block";
                chances = arr.length;
                baseProfit = betAmount;
                calculateProfit(chances, baseProfit);
            }
        });
    }
}
function reset(){
    (overlay).addEventListener("click",()=>{
        location.reload()
    })
}
function manageMoney(profit) {
    let currentMoney = Number(totalMoney.innerText);   
    let newMoney = currentMoney + Number(profit); 
    totalMoney.innerText = newMoney; 
    localStorage.setItem('walletMoney', newMoney); 
}
function addmodel(){
    bigOverlay.style.display = "block";
    AddModel.style.scale = "1";
}
function blast(){
    body.style.animation = "shake 0.7s ease-out 1 forwards "
    explosionSound.play();
}

makeSpaces();
workingBtn();
reset();
checkBetAmount()
