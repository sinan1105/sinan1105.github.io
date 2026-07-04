/* --------------------------
   Scroll Reveal
-------------------------- */

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},{
    threshold:.15
});

reveals.forEach(card=>observer.observe(card));



/* --------------------------
   LIGHTBOX
-------------------------- */

const images=document.querySelectorAll(".lightbox-image");

const lightbox=document.getElementById("lightbox");

const lightboxImg=document.getElementById("lightbox-img");

const closeBtn=document.querySelector(".close-btn");

const prev=document.querySelector(".prev");

const next=document.querySelector(".next");

let current=0;

const list=[...images];

list.forEach((img,index)=>{

    img.addEventListener("click",()=>{

        current=index;

        showImage();

    });

});

function showImage(){

    lightboxImg.src=list[current].src;

    lightbox.classList.add("show");

}

closeBtn.onclick=()=>{

    lightbox.classList.remove("show");

};

lightbox.onclick=(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("show");

    }

};

next.onclick=(e)=>{

    e.stopPropagation();

    current=(current+1)%list.length;

    showImage();

};

prev.onclick=(e)=>{

    e.stopPropagation();

    current=(current-1+list.length)%list.length;

    showImage();

};

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("show")) return;

    if(e.key==="Escape"){

        lightbox.classList.remove("show");

    }

    if(e.key==="ArrowRight"){

        current=(current+1)%list.length;

        showImage();

    }

    if(e.key==="ArrowLeft"){

        current=(current-1+list.length)%list.length;

        showImage();

    }

});