// function writeToDB(){
//   var firebaseRef = firebase.database().ref()
//   firebaseRef.child("playlists").set("HBO Show");
// }
// write()
function writeUserData(name, imageUrl, desc, gen, hash) {
  firebase.database().ref('playlists/' + name).set({
    cover_art: imageUrl,
    description : desc,
    genre: gen,
    hashtags: hash
  });
  console.log("wrote user data")
}

/////// Testing writing to database ///////////////////////
// var genres = ["pop", "alternative", "rock"];
// var hashtags = ["firstPlaylist", "personal"];
// writeUserData("Songs To Make You Think About Me", "/images/cloud.ico",
// "My first playlist", genres, hashtags)

firebase.database().ref('/playlists/').once('value').then(function(snapshot) {
  console.log(snapshot.val());
});
