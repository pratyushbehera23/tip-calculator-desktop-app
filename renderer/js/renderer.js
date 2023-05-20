const output = document.getElementById('output');
const sym = document.getElementById('sym');
const btn = document.getElementById('btn');
// 
btn.addEventListener('click', ()=>{
    const amount = Number(document.getElementById('amount').value);
    const people = Number(document.getElementById('people').value);
    const tipper = Number(document.getElementById('tipper').value);
    // 
    sym.style.display = "inline";
    const eachpay = (amount + (amount * tipper/100)) / people;
    output.innerHTML = eachpay;
});
