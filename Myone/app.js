// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date=document.getElementById('date');
date.innerHTML=new Date().getFullYear();
// ********** close links ************
const navToggle=document.querySelector('.nav-toggle');
const linksContainer=document.querySelector('.links-container');
const links=document.querySelector('.links');

navToggle.addEventListener('click',function()
{
    //linksContainer.classList.toggle("show-links");
    //we can do like this but when we try to add some links or delete some links 
    //we will not be seeing the links because the height is given as static in css
    //so for avoiding such errors we need to load the height dynamically from the links
    //const containerSize=linksContainer.getBoundingClientRect();
   // console.log(containerSize);..heigth is given as 0......
    //if we see in the html we used both links container and links because if we directly set up the links height in css to zero 
    //generally we cannot access the actual height of the links so we kept the linkscontainer to zero 
    //and the actual height is stored in the links and it is not changed 
    const containerHeight=linksContainer.getBoundingClientRect().height;
    const linksHeight=links.getBoundingClientRect().height;
    if(containerHeight===0)
    {
        linksContainer.style.height=`${linksHeight}px`; 
        //accesing the styles sheet..
    }
    else{
        linksContainer.style.height=0;
    }
    
})
// ********** fixed navbar ************
const navbar=document.getElementById("nav");
const topLink=document.querySelector(".top-link");
window.addEventListener('scroll',function()
{
    //this gives the how much height it is scrolled vertically
    // console.log(window.pageYOffset);
   const scrollHeight=window.pageYOffset;
   const navHeight=navbar.getBoundingClientRect().height;
   if(scrollHeight>=navHeight)
   {
    navbar.classList.add('fixed-nav');
   }
   else{
    navbar.classList.remove('fixed-nav')
}
if(scrollHeight>500)
{
    topLink.classList.add("show-link");
}
else
{
    topLink.classList.remove("show-link");
}
})
// ********** smooth scroll ************
// select links 
const scrollLinks=document.querySelectorAll(".scroll-link");
scrollLinks.forEach(function(link)
{
    link.addEventListener("click",function(e)
    {
        e.preventDefault();
        //this prevents the default function of the event to happen
        const id=e.currentTarget.getAttribute('href').slice(1);
        //slice(1) gives the string from 1 index
        //gives the id
        const element=document.getElementById(id);
        //calculate the heights
        const navHeight=navbar.getBoundingClientRect().height;
        const containerHeight=linksContainer.getBoundingClientRect().height;
        const fixedNav=navbar.classList.contains("fixed-nav");
        //console.log(element);
        //gives the html element referred by the id
        let position=element.offsetTop-navHeight;
        //offset.top gives the starting postion of the element
        //navHeight is subtracted due to the navbar is an extra addon
        //console.log(position);
        if(!fixedNav)//if there is fixed nav we should again subtract the navHeight as it is an extra addon
        {
            position=position-navHeight;
        }
        if(navHeight>82)//In smallscreen mode the when we open the links containerHeight also does matter
        {
            position=position+containerHeight;
        }
        window.scrollTo(
            {
                left:0,
                top:position,
    });
    linksContainer.style.height=0;
    });
});