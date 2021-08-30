import './sass/main.scss';
import API from './api';
import templateCard from './templates/card.hbs';
import templateList from './templates/list-countri.hbs';
import { info } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import '@pnotify/core/dist/BrightTheme.css';
import { error } from "@pnotify/core";
const serchInput=document.getElementById('searchInput');
const cardContainer=document.getElementById('cardContainer');
const listCountries=document.getElementById('list-countries');
var _ = require('lodash');


let inputChange=_.debounce(function(){


    if(!serchInput.value.length){
        render([]);
    }else{
        API.fetchCountri(serchInput.value)
        .then(onSuccess)
        .catch(onError);
    }
}, 500);
serchInput.addEventListener('input',inputChange);
function onError(){
    alert('problem serch you countri');
}

function render(countries){
     if(!countries.length){
        cardContainer.innerHTML='';
        listCountries.innerHTML='';
        }
    else if(countries.length===1){
        const markup= templateCard(countries);
        cardContainer.innerHTML=markup;
    }else if(countries.length<=10){
        const listMarkup=templateList(countries);
        listCountries.innerHTML=listMarkup;
    }
    else if(countries.length>10){
        showError();
    }
   
    

}
function onSuccess(countries){
render(countries);
}



function showError() {
  error({
    title: "Error found",
    text:
      "Too many matches found.Please enter more specific query!",
      delay: 750,
  });
}