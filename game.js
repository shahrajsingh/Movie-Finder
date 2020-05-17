//var api_key='00120c71fafa0b093f088af0f0e1ef61'
$(()=>{
   
  $("#search").on('submit', (e)=>{
        var game = $("#searchInput").val();
        if(game == "")
        {
          alert('No Data Entered');
          return;
        }
        getGameInfo(game);
        e.preventDefault();
        $("#r1").empty();
        $("#r2").empty();
        $("#r3").empty();
        $("#tm").empty();
        $("#tm2").empty();
        $("#tm1").empty();
  })
});

function getGameInfo(game){
   fetch(`https://api.rawg.io/api/games?search=${game}`).then(result =>{
    return result.json();
}).then(result => {
    init4(result);
})
}
function init4(resultFromServer){
    console.log(resultFromServer);
    var output;
    let gameNames = resultFromServer.results;
    $.each(gameNames, (index, val)=>{
      $("#r1").append(`
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" id="c1" style="margin-bottom: 20px;"><div class="card" style="width: 240px;height:240px;">
        <div class="hovereffect">
        <img  class="img-responsive" src="${val.background_image}"  alt="No poster available">
        <div class="overlay">
        <h4>${val.name.substring(0, 20)}</h4>
        <a href="#" onclick="gameSelected('${val.id}')"   class="info">View Details</a>
        </div>
        </div>
        <div class="card-body"><hp class="card-title">${val.name.substring(0, 20)}</p>
        <p>${val.released}</p></div>
        </div>
      </div> `)
  });
 
}

function gameSelected(id){
  console.log(id);
  sessionStorage.setItem('gameId', id);
  window.location = 'GameDetails.html';
  return false;
}

function getGameDetails(){
   var gameId = sessionStorage.getItem('gameId');
  
   fetch(`https://api.rawg.io/api/games/${gameId}`).then(result =>{
    return result.json();
}).then(result => {
     //console.log(result);  
     var gamDet = result;
     var gamGenres;
     var pstlink = gamDet.background_image;
     //var l1=pstlink1.concat(pstlink);
     //alert(l1);
     if(gamDet.genres.length === 0)
     {
       gamGenres = 'Not mentioned';
     }
     else
     {
      gamGenres = gamDet.genres[0].name;
     }
     
     //var link=gamDet.platforms[2].requirements.minimum;
     //alert(link);
     let video = `<div class="d-flex justify-content-center" style="height:480px;background:#3e3e3e"> <h1 style="margin-top:200px;color:white">Video Not Available </h1> </div>`;
    //  console.log(gamDet.clip);
     if(gamDet.clip !== null){
       video = `<iframe width="100%" height="480" src="https://www.youtube.com/embed/${gamDet.clip.video}" frameBorder="0">
       </iframe>;`
     }
     var output = `
            <div class="row">
              <div class="col-sm-8 col-md-8 col-lg-8" id="cl1" >
                  ${video}
              </div>
              <div class="col-sm-4 col-md-4 col-lg-">
                <h2 style="color:white">${gamDet.name}</h2>
                <table class="table text-white" style="background: rgba(0,0,0,0.6)">
                <tbody>
                <tr><td style="font-size: 18px">Genre</td><td style="font-size: 18px">${gamGenres}</tr></tr>
                <tr><td style="font-size: 18px">Release Date</td><td style="font-size: 18px">${gamDet.released}</tr></tr>
                <tr><td style="font-size: 18px">Publishers</td><td style="font-size: 18px">${gamDet.publishers[0].name}</tr></tr>
                <tr><td style="font-size: 18px">Rating</td><td style="font-size: 18px"><img src="str.png" style="float:left;"height="60%">&nbsp;${gamDet.rating}</tr></tr>
        
                </tbody>
                </table>
                <a href="${gamDet.stores[1].url}" class="btn btn-success" style="width: 8rem;">Buy</a>
                <a href="GameApp.html" class="btn btn-danger">Go back to search</a>
              </div>
            </div>
            <div class="row" style="background-color: #1A1A1D;color:white;border-radius: 8px;">
            
             </div>
            
     
     `
    $('body').css('background-image', 'url("' + gamDet.background_image + '")');
    $('body').css('background-repeat', 'no-repeat');
    $('body').css('background-size', 'cover');
     $("#GameDetails").html(output);
})
}



function NewGames() {
  fetch(`https://api.rawg.io/api/games`).then(result => {
    return result.json();
  }).then(result => {
    init(result);
  })
}
function init(resultFromServer) {
  console.log(resultFromServer);
  var output;
  let gameNames = resultFromServer.results;   //create array of movies
  $.each(gameNames, (index, val) => {
   

    $("#r1").append(`
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" id="c1" style="margin-bottom: 20px;"><div class="card" style="width: 240px;height:240px;">
            <div class="hovereffect">
            <img  class="img-responsive" src="${val.background_image}"  alt="No poster available">
            <div class="overlay">
            <h4>${val.name.substring(0, 20)}</h4>
            <a href="#" onclick="gameSelected('${val.id}')"   class="info">View Details</a>
            </div>
            </div>
            <div class="card-body"><hp class="card-title">${val.name.substring(0, 20)}</p>
            <p>${val.released}</p></div>
            </div>
          </div> `)
  });
  $("#r1").append(`<button class="btn btn-success" id="bt1" onclick='sh1()'>Show More</button>
    `)

}
function sh1(){
  fetch(`https://api.rawg.io/api/games?page=2`).then(result5 => {
    return result5.json();
  }).then(result5 => {
    init5(result5);
  })
}
function init5(resultFromServer5) {
  console.log(resultFromServer5);
  var output;
  let gameNames1 = resultFromServer5.results;   //create array of movies
  $('#bt1').remove();
  $.each(gameNames1, (index, val) => {

    $("#r1").append(`
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" id="c1" style="margin-bottom: 20px;"><div class="card" style="width: 240px;height:240px;">
    <div class="hovereffect">
    <img  class="img-responsive" src="${val.background_image}"  alt="No poster available">
    <div class="overlay">
    <h4>${val.name.substring(0, 20)}</h4>
    <a href="#" onclick="gameSelected('${val.id}')"   class="info">View Details</a>
    </div>
    </div>
    <div class="card-body"><hp class="card-title">${val.name.substring(0, 20)}</p>
    <p>${val.released}</p></div>
    </div>
  </div> `)
  });
}
