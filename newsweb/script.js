const APIKEY="3c686cf46d564155b38522e89acb647d";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews('india'));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${APIKEY}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardcontainer =document.getElementById('cardcontainer');
    const newscardtemplate = document.getElementById('templatenewscard');
    cardcontainer.innerHTML="";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newscardtemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardcontainer.appendChild(cardClone); 
    });
}

function fillDataInCard(cardClone,article){
    const newsimg=cardClone.querySelector('#newsimg');
    const newstitle=cardClone.querySelector('#newstitle');
    const newssource=cardClone.querySelector('#newssource');
    const newsdesc=cardClone.querySelector('#newsdesc');

    newsimg.src= article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta" ,
    } );
    newssource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener('click',() =>{
        window.open(article.url,'_blank');
    });
}

let curseletednav = null;
function onNavitemclick(id){
    fetchNews(id);
    const navitem = document.getElementById(id);
    curseletednav?.classList.remove('active');
    curseletednav = navitem;
    curseletednav.classList.add('active');
}

const searchbutton = document.getElementById('searchbutton');
const searchtext = document.getElementById('searchtext');

searchbutton.addEventListener('click', () =>{
    const query = searchtext.value;
    if(!query) return ;
    fetchNews(query);
    curseletednav?.classList.remove('active');
    curseletednav = null;
})

function reload(){
    window.location.reload();
}