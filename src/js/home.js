const $action_container = document.querySelector('#action');
const $drama_container = document.querySelector('#drama');
const $animation_container = document.querySelector('#animation');

const $modal = document.getElementById('modal');
const $overlay = document.getElementById('overlay');
const $btn_hideModal = document.getElementById('hide-modal');

const $featuring_container = document.getElementById('featuring');
const $form = document.getElementById('#form');
const $modal_title = $modal.querySelector('h1');
const $modal_image = $modal.querySelector('img');
const $modal_description = $modal.querySelector('p');

async function load(){
    const action_list = await load_movieList_by_genre('action');
    const drama_list = await load_movieList_by_genre('drama');
    const animation_list = await load_movieList_by_genre('animation');
    console.log('action_list',action_list);
    console.log(drama_list);
    console.log(animation_list);
    load_movieLists(action_list,drama_list,animation_list);
    $action_container.removeChild($action_container.firstElementChild)
    $drama_container.removeChild($drama_container.firstElementChild)
    $animation_container.removeChild($animation_container.firstElementChild)
    debugger
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

async function load_movieList_by_genre(genre){
    const response = await fetch('https://yts.mx/api/v2/list_movies.json?genre='+genre)
                            .then(res => res.json())
                            .catch(err => console.log(res));
    return response;   
}

function videoItemTemplate(movie){
    return(
        `<div class="primaryPlaylistItem">
            <div class="primaryPlaylistItem-image">
                <img src=${movie.medium_cover_image}>
            </div>
            <h4 class="primaryPlaylistItem-title">
            ${movie.title}
            </h4>
        </div>`

    );
}



load();







