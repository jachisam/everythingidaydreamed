// write data to firebase
function writeUserData(name, imageUrl, desc, gen, hash) {
  firebase.database().ref('playlists/' + name).set({
    cover_art: imageUrl,
    description : desc,
    genre: gen,
    hashtags: hash
  });
  console.log("wrote user data")
}

// function playlistElement(text){
//   const pn = document.createElement("P");
//   const tn = document.createTextNode(text);
//   pn.appendChild(tn);
//   document.getElementById("playlist-name-div").appendChild(pn);
// }
//
// function pElement(text){
//   const pn = document.createElement("P");
//   const tn = document.createTextNode(text);
//   pn.appendChild(tn);
//   document.getElementById("playlist-div").appendChild(pn);
// }
//
// function imgElement(img){
//   const pn = document.createElement("IMG");
//   pn.setAttribute("src", img);
//   pn.setAttribute("width", "304");
//   pn.setAttribute("height", "228");
//   pn.setAttribute("alt", img);
//   document.getElementById("playlist-div").appendChild(pn);
// }

//Retrieve data from firebase
firebase.database().ref('/playlists/').once('value').then(function(snapshot) {
  const data = snapshot.val();
  console.log(data);

  const playlistNames = Object.keys(data);
  let section_flag = true; //used to switch between the two types of sections (picture to the left or right)

  for(const name of playlistNames){
    const description = data[name].description;
    const img = data[name].cover_art;
    if (section_flag === true){
      createPlaylistSection(name, description, img);
    }else{
      createPlaylistSection2(name, description, img);
    }
    section_flag = !(section_flag);
  }
});

//create the playlist section 1 divs (picture on the right)
function createPlaylistSection(name, description, img){
  const section = document.createElement("div");
  section.setAttribute("class", "row no-gutters");
  const section_img = document.createElement("div");
  section_img.setAttribute("class", "col-lg-6 order-lg-2 text-white showcase-img");
  section_img.setAttribute("style", "background-image: url('"+img+"');");
  section.appendChild(section_img);
  const section_text = document.createElement("div");
  section_text.setAttribute("class", "col-lg-6 order-lg-1 my-auto showcase-text");
  const section_text_h2 = document.createElement("h2");
  section_text_h2.innerHTML = name;
  const section_text_p = document.createElement("p");
  section_text_p.setAttribute("class", "lead mb-0");
  section_text_p.innerHTML = description;
  section_text.appendChild(section_text_h2);
  section_text.appendChild(section_text_p);
  section.appendChild(section_text);
  document.getElementById("playlist-sections").appendChild(section);
}
//create the playlist section 2 divs (picture on the left)
function createPlaylistSection2(name, description, img){
  const section2 = document.createElement("div");
  section2.setAttribute("class", "row no-gutters");
  const section_img2 = document.createElement("div");
  section_img2.setAttribute("class", "col-lg-6 text-white showcase-img");
  section_img2.setAttribute("style", "background-image: url('"+img+"');");
  section2.appendChild(section_img2);
  const section_text2 = document.createElement("div");
  section_text2.setAttribute("class", "col-lg-6 order-lg-1 my-auto showcase-text");
  const section_text_h22 = document.createElement("h2");
  section_text_h22.innerHTML = name;
  const section_text_p2 = document.createElement("p");
  section_text_p2.setAttribute("class", "lead mb-0");
  section_text_p2.innerHTML = description;
  section_text2.appendChild(section_text_h22);
  section_text2.appendChild(section_text_p2);
  section2.appendChild(section_text2);
  document.getElementById("playlist-sections").appendChild(section2);
}
