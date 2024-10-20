const dropList=document.querySelectorAll('.drop-list select');
const convertButton= document.querySelector('button');
const formCurrency =document.querySelector('.form select');
const toCurrency=document.querySelector('.to select');
const exchangeRateContainer= document.querySelector('.exchange-rate');
const swapIcon= document.querySelector('.icon');


for(let i=0; i<dropList.length;i++){
    for(currency_code in country_list){
        let selected;
        if(i==0){
            selected= currency_code == 'USD' ? 'selected' : '';
        } else if(i==1){
            selected= currency_code == 'BDT' ? 'selected' : '';
        }

        let optionTag = `<option   value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML('beforeend', optionTag);
       
    }
    dropList[i].addEventListener('change', e=>{
        loadFlag(e.target);
    });
}

function loadFlag(element){
    for(code in country_list){
        if(code==element.value){
            const imageTag=element.parentElement.querySelector('img');
            imageTag.src=`https://flagsapi.com/${country_list[code]}/flat/64.png`;
        }
    }
}


convertButton.addEventListener('click', e=>{
    e.preventDefault();
    exchangeRateContainer.classList.remove('d-none');
    exchangeRateContainer.innerText=`Getting converted value...`;
    convertCurrency();
});

swapIcon.addEventListener('click',e=>{
    let temp=formCurrency.value;
    formCurrency.value=toCurrency.value;
    toCurrency.value=temp;
    loadFlag(formCurrency);
    loadFlag(toCurrency);
});


function convertCurrency(){
    const amount = document.querySelector('.amount input');
    let amountValue= amount.value;

    if( amountValue=='' || amountValue==0 || (amountValue!= Number(amountValue))){
        alert('Please insert a valid number');
        exchangeRateContainer.classList.add('d-none');
        amount.value='';
        return;
    }

    let url=` https://v6.exchangerate-api.com/v6/50259292617828ffc09ea711/latest/${formCurrency.value}`
    
    fetch(url).then(response=> response.json()).then(result=>{
       let exchangeRate= result.conversion_rates[toCurrency.value];
       let convertedValue= (amountValue* exchangeRate).toFixed(2);
       exchangeRateContainer.innerText=`${amountValue} ${formCurrency.value} = ${convertedValue} ${toCurrency.value}`
       exchangeRateContainer.classList.remove('d-none');

    }).catch(()=>{
        exchangeRateContainer.classList.remove('d-none');
        exchangeRateContainer.innerText=`Something went wrong`;
    });

}