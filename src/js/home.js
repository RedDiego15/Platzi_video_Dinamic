const $action_container = document.querySelector('#action');
const $drama_container = document.querySelector('#drama');
const $animation_container = document.querySelector('#animation');

const $primaryPlayList = document.getElementsByClassName('primaryPlaylist');



const $modal = document.getElementById('modal');
const $overlay = document.getElementById('overlay');
const $btn_hideModal = document.getElementById('hide-modal');

const $featuring_container = document.getElementById('featuring');
const $form = document.getElementById('#form');
const $modal_title = $modal.querySelector('h1');
const $modal_image = $modal.querySelector('img');
const $modal_description = $modal.querySelector('p');

const $flechas = document.getElementsByClassName('flecha');
console.log($flechas);

async function load(){
    const action_list = await load_movieList_by_genre('action');
    const drama_list = await load_movieList_by_genre('drama');
    const animation_list = await load_movieList_by_genre('animation');
    console.log('action_list',action_list);
    console.log(drama_list);
    console.log(animation_list);
    load_movieLists(action_list,drama_list,animation_list);
    removeLoadingGif();
    appearScrollArrows();
    giveScroll();
    pagination();
}

async function load_movieList_by_genre(genre){
    const response = await fetch('https://yts.mx/api/v2/list_movies.json?genre='+genre)
                            .then(res => res.json())
                            .catch(err => console.log(res));
    return response;   
}
function load_movieLists(action_list,drama_list,animation_list){
    console.log(action_list.data.movies);
    action_list.data.movies.forEach((movie) => {
        /*debugger;*/
        const HTMLString = videoItemTemplate(movie);
        $action_container.innerHTML += HTMLString;
    });
    drama_list.data.movies.forEach((movie) => {
        /*debugger;*/
        const HTMLString = videoItemTemplate(movie);
        $drama_container.innerHTML += HTMLString;
    });
    animation_list.data.movies.forEach((movie) => {
        /*debugger;*/
        const HTMLString = videoItemTemplate(movie);
        $animation_container.innerHTML += HTMLString;
    });
}
function removeLoadingGif(){
    $action_container.removeChild($action_container.firstElementChild)
    $drama_container.removeChild($drama_container.firstElementChild)
    $animation_container.removeChild($animation_container.firstElementChild)

}
function appearScrollArrows(){
    for(let btn of $flechas){
        btn.classList.remove('hiden');
    }
}
function giveScroll(){
    for(const container of $primaryPlayList){
        const carousel = container.querySelector('.primaryPlaylist-list')
        const $indicadores = container.querySelector('.indicadores')
        const $lista_botones = carousel.querySelectorAll('button')
        const $contenedor_carousel = carousel.querySelector('div')

        
        pagination($indicadores,$contenedor_carousel);
        debugger
        $lista_botones[0].addEventListener('click',function(){action_btn_scroll.bind($lista_botones[0])($contenedor_carousel,$indicadores)})
        $lista_botones[1].addEventListener('click',function(){action_btn_scroll.bind($lista_botones[1])($contenedor_carousel,$indicadores)})   
    }

}
function action_btn_scroll(carousel,$indicadores){
    const indicadorActivo = $indicadores.querySelector('.activo')

    if(this.classList.contains('flecha-derecha')){
        carousel.scrollLeft += carousel.offsetWidth
        if(indicadorActivo.nextSibling){
            indicadorActivo.classList.remove('activo')
            indicadorActivo.nextSibling.classList.add('activo')
        }
        
    }else{
        carousel.scrollLeft -= carousel.offsetWidth;  
        if(indicadorActivo.previousSibling){
            indicadorActivo.classList.remove('activo')
            indicadorActivo.previousSibling.classList.add('activo')
        }
    }
}

function videoItemTemplate(movie){
    return(
        `<div class="primaryPlaylistItem">
            <figure class="primaryPlaylistItem-image">
                <img src=${movie.medium_cover_image} alt = "image movie">
            </figure>
        </div>`

    );
}
const numeroPaginas = function numberPages(){
    const $total_peliculas = document.querySelectorAll('#action .primaryPlaylistItem')
    let numberPages;
    if(screen.width<600){
        numberPages=Math.ceil($total_peliculas.length/3)
        return numberPages;
    }else{
        numberPages=Math.ceil($total_peliculas.length/5)
        debugger
        return numberPages;
    }
}
function pagination(container_indicator,carousel){
    const number_Pages = numeroPaginas();

    for(let i=0;i<number_Pages;i++){
        const indicator = document.createElement('button');
        if(i==0){
            indicator.classList.add('activo')
        }
        container_indicator.appendChild(indicator)
        indicator.addEventListener('click', e=>{
            carousel.scrollLeft= i*carousel.offsetWidth
            container_indicator.querySelector('.activo').classList.remove('activo')
            e.target.classList.add('activo')
            

        })
       
    }
    
    

}



load();
