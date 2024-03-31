const BaseUrl=" https://v6.exchangerate-api.com/v6/32239d2181af51268541d16a/latest/";
let dropdown= document.querySelectorAll(".country select");
let btn = document.querySelector(".btn");
let amount = document.querySelector(".amount input");
let msg = document.querySelector(".result");
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select");
for(let select of dropdown){
    for(code in countryList){
      let newOption = document.createElement("option");
      newOption.innerText=code;
      newOption.value=code;
      
      if(select.name ==="from" && code ==="USD"){
        newOption.selected="selected";
      }else  if(select.name ==="to" && code ==="PKR"){
        newOption.selected="selected";
      }
      select.append(newOption);
        
    }
    select.addEventListener("change", (evt)=>{
        changeFlag(evt.target);

    })
}
const changeFlag =(element)=>{
    let code = element.value;
    let countryCode = countryList[code];
    
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    
    let img = element.parentElement.querySelector("img");
    img.src =newSrc; 
   

}



btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amtV=amount.value;
    if(amtV="" || amtV<1){
        amount.value="1";
        amtV=1;
        
        
    }
    let URL = `${BaseUrl}${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    
    let rate = data.conversion_rates;
    for( con in rate){
     if( con===toCurr.value){
      let finalConversion = rate[con]*amount.value;
      
      msg.innerText=`${amount.value}${fromCurr.value} = ${finalConversion}${toCurr.value}`;
      
     }
     


      
    }
  })
 