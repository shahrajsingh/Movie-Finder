var api_key='00120c71fafa0b093f088af0f0e1ef61'
$(()=>{
   
  $("#search").on('submit', (e)=>{
        var movie = $("#searchInput").val();
        if(movie == "")
        {
          alert('No Data Entered');
          return;
        }
        getMovieInfo(movie);
        e.preventDefault();
        $("#r1").empty();
        $("#r2").empty();
        $("#r3").empty();
        $("#tm").empty();
        $("#tm2").empty();
        $("#tm1").empty();
  })
});

function getMovieInfo(movie){
   fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movie}`).then(result =>{
    return result.json();
}).then(result => {
    init4(result);
})
}
function init4(resultFromServer){
    console.log(resultFromServer);
    var output;
    let movieNames = resultFromServer.results;
    $.each(movieNames, (index, val)=>{
      let poster = `<div style="height:256px;background:#333;color:white;padding-top:90px;">
      <i class="fa fa-exclamation-circle" style="font-size:25px"></i><br>
      No poster available
      </div>`
      if(val.poster_path){
        poster = `<img  class="img-responsive" src="https://image.tmdb.org/t/p/w185${val.poster_path}" alt="No poster available">`;
      }
        $("#r1").append(`
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" id="c1" style="margin-bottom: 20px;"><div class="card" style="width: 185px;">
        
        <div class="hovereffect">
        ${poster}
        <div class="overlay">
        <h4>${val.original_title.substring(0, 20)}</h4>
        <a href="#" onclick="movieSelected('${val.id}')"   class="info">View Details</a>
        </div>
        </div>
        <div class="card-body"><hp class="card-title">${val.original_title.substring(0, 20)}</p>
        <p>${val.release_date}</p></div>
        </div>
      </div> `)
  });
 
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movieDetails.html';
  return false;
}

function getMovieDetails(){
   var movieId = sessionStorage.getItem('movieId');
    //var key= get_key(movieId);
    var key="";
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=00120c71fafa0b093f088af0f0e1ef61&language=en-US`).then(result0 =>{
    return result0.json();
}).then(result0 =>{
    console.log(result0)
    var key1=result0;
    key=key1.results[0].key;
  })
   fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`).then(result =>{
    return result.json();
}).then(result => {
     //console.log(result);  
     var movDet = result;
     var movGenres;
     var pstlink1="https://image.tmdb.org/t/p/original";
     var pstlink = movDet.poster_path;
     var l1=pstlink1.concat(pstlink);
     //alert(l1);
     if(movDet.genres.length === 0)
     {
       movGenres = 'Not mentioned';
     }
     else
     {
      movGenres = movDet.genres[0].name;
     }
     //alert('hello');
     var output = `
            <div class="row">
              <div class="col-sm-8 col-md-8 col-lg-8" id="cl1" >
                <iframe width="100%" height="480" src="https://www.youtube.com/embed/${key}" frameBorder="0">
                </iframe>
              </div>
              <div class="col-sm-4 col-md-4 col-lg-" style=" background: rgba(0,0,0,0.2);">
                <h2 style="color:white">${movDet.original_title}</h2>
                <table class="table table-striped table-dark" style=" background: rgba(0,0,0,0.7);">
                <tbody>
                <tr><td style="font-size: 18px">Genre</td><td style="font-size: 18px">${movGenres}</tr></tr>
                <tr><td style="font-size: 18px">Release Date</td><td style="font-size: 18px">${movDet.release_date}</tr></tr>
                <tr><td style="font-size: 18px">Original Language</td><td style="font-size: 18px">${movDet.original_language}</tr></tr>
                <tr><td style="font-size: 18px">Rating</td><td style="font-size: 18px"><img src="str.png" style="float:left;"height="60%">&nbsp;${movDet.vote_average}</tr></tr>
                <tr><td style="font-size: 18px">Status</td><td style="font-size: 18px">${movDet.status}</tr></tr>
                </tbody>
                </table>
                <a href="https://imdb.com/title/${movDet.imdb_id}" class="btn btn-warning">View in IMDB</a>
                <a href="movieApp.html" class="btn btn-primary">Go back to search</a>
              </div>
            </div>
            <div class="row" style="background-color: #1A1A1D;color:white;border-radius: 8px;">
             <p class="well" style="font-family: verdana;font-size: 16px;> ${movDet.overview}</p>
             </div>
            
     
     `
     $('body').css('background-image', 'url("' + l1 + '")');
     $('body').css('background-repeat', 'no-repeat');
    $('body').css('background-size', 'cover');
     $("#movieDetails").html(output);
})
}



function NewMovies() {
  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=00120c71fafa0b093f088af0f0e1ef61&language=en-US&page=1`).then(result => {
    return result.json();
  }).then(result => {
    init(result);
  })
}
function init(resultFromServer) {
  console.log(resultFromServer);
  var output;
  let movieNames = resultFromServer.results;   //create array of movies
  $.each(movieNames, (index, val) => {
    if (index > 3) {
      return false;
    }

    $("#r1").append(`
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" id="c1"><div class="card" style="width: 185px;">
            <div class="hovereffect">
            <img  class="img-responsive" src="https://image.tmdb.org/t/p/w185${val.poster_path}" alt="No poster available">
            <div class="overlay">
            <h4>${val.original_title.substring(0, 20)}</h4>
            <a href="#" onclick="movieSelected('${val.id}')"   class="info">View Details</a>
            </div>
            </div>
            <div class="card-body"><hp class="card-title">${val.original_title.substring(0, 20)}</p>
            <p>${val.release_date}</p></div>
            </div>
          </div> `)
  });
  $("#r1").append(`<button class="btn btn-success" id="bt1" onclick='sh1()'>Show More</button>
    `)

}
function sh1(){
  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=00120c71fafa0b093f088af0f0e1ef61&language=en-US&page=1`).then(result5 => {
    return result5.json();
  }).then(result5 => {
    init5(result5);
  })
}
function init5(resultFromServer5) {
  console.log(resultFromServer5);
  var output;
  let movieNames5 = resultFromServer5.results;   //create array of movies
  $('#bt1').remove();
  $.each(movieNames5, (index, val) => {
    if (index < 3) {
      return true;
    }

    $("#r1").append(`
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" id="c1"><div class="card" style="width: 185px;">
            <div class="hovereffect">
            <img  class="img-responsive" src="https://image.tmdb.org/t/p/w185${val.poster_path}" alt="No poster available">
            <div class="overlay">
            <h4>${val.original_title.substring(0, 20)}</h4>
            <a href="#" onclick="movieSelected('${val.id}')"   class="info">View Details</a>
            </div>
            </div>
            <div class="card-body"><hp class="card-title">${val.original_title.substring(0, 20)}</p>
            <p>${val.release_date}</p></div>
            </div>
          </div> `)
  });
 
}
function PopularMovies() {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=00120c71fafa0b093f088af0f0e1ef61&language=en-US&page=1`).then(result1 => {
    return result1.json();
  }).then(result1 => {
    init1(result1);
  })
}
function init1(resultFromServer1) {
  console.log(resultFromServer1);
  var output1;
  let movieNames1 = resultFromServer1.results;   //create array of movies
  $.each(movieNames1, (index, val1) => {
    if (index > 3) {
      return false;
    }
    $("#r2").append(`
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12"id="c2"><div class="card" style="width: 185px;">
            <div class="hovereffect">
            <img  class="img-responsive" src="https://image.tmdb.org/t/p/w185${val1.poster_path}" alt="No poster available">
            <div class="overlay">
            <h4>${val1.original_title.substring(0, 20)}</h4>
            <a href="#" onclick="movieSelected('${val1.id}')"   class="info">View Details</a>
            </div>
            </div>
            <div class="card-body"><p class="card-title">${val1.original_title.substring(0, 20)}</hp>
            <p>${val1.release_date}</p></div>
            </div>
          </div> `)
  });
  $("#r2").append(`<button class="btn btn-success" id="bt2" onclick='sh2()'>Show More</button>
    `)

}
function sh2(){
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=00120c71fafa0b093f088af0f0e1ef61&language=en-US&page=1`).then(result6 => {
    return result6.json();
  }).then(result6 => {
    init6(result6);
  })
}
function init6(resultFromServer6) {
  console.log(resultFromServer6);
  var output;
  let movieNames6 = resultFromServer6.results;   //create array of movies
  $('#bt2').remove();
  $.each(movieNames6, (index, val) => {
    if (index < 3) {
      return true;
    }

    $("#r2").append(`
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" id="c1"><div class="card" style="width: 185px;">
            <div class="hovereffect">
            <img  class="img-responsive" src="https://image.tmdb.org/t/p/w185${val.poster_path}" alt="No poster available">
            <div class="overlay">
            <h4>${val.original_title.substring(0, 20)}</h4>
            <a href="#" onclick="movieSelected('${val.id}')"   class="info">View Details</a>
            </div>
            </div>
            <div class="card-body"><hp class="card-title">${val.original_title.substring(0, 20)}</p>
            <p>${val.release_date}</p></div>
            </div>
          </div> `)
  });
}


function TopRated() {
  fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=00120c71fafa0b093f088af0f0e1ef61&language=en-US&page=1`).then(result2 => {
    return result2.json();
  }).then(result2 => {
    init2(result2);
  })
}
function init2(resultFromServer2) {
  console.log(resultFromServer2);
  var output2;
  let movieNames2 = resultFromServer2.results;   //create array of movies
  $.each(movieNames2, (index, val2) => {
    if (index > 3) {
      return false;
    }
    $("#r3").append(`
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12"id="c3"><div class="card" style="width: 185px;">
            <div class="hovereffect">
            <img  class="img-responsive" src="https://image.tmdb.org/t/p/w185${val2.poster_path}" alt="No poster available">
            <div class="overlay">
            <h4>${val2.original_title}</h4>
            <a href="#" onclick="movieSelected('${val2.id}')"   class="info">View Details</a>
            </div>
            </div>
            <div class="card-body"><p class="card-title">${val2.original_title}</p>
            <p>${val2.release_date}</p></div>
            </div>
          </div> `)
  });
  $("#r3").append(`<button class="btn btn-success" id="bt3" onclick='sh3()'>Show More</button>
    `)
}
function sh3(){
  fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=00120c71fafa0b093f088af0f0e1ef61&language=en-US&page=1`).then(result7 => {
    return result7.json();
  }).then(result7 => {
    init7(result7);
  })
}
function init7(resultFromServer7) {
  console.log(resultFromServer7);
  var output;
  let movieNames7 = resultFromServer7.results;   //create array of movies
  $('#bt3').remove();
  $.each(movieNames7, (index, val) => {
    if (index < 3) {
      return true;
    }

    $("#r3").append(`
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" id="c1"><div class="card" style="width: 185px;">
            <div class="hovereffect">
            <img  class="img-responsive" src="https://image.tmdb.org/t/p/w185${val.poster_path}" alt="No poster available">
            <div class="overlay">
            <h4>${val.original_title.substring(0, 20)}</h4>
            <a href="#" onclick="movieSelected('${val.id}')"   class="info">View Details</a>
            </div>
            </div>
            <div class="card-body"><hp class="card-title">${val.original_title.substring(0, 20)}</p>
            <p>${val.release_date}</p></div>
            </div>
          </div> `)
  });
}

