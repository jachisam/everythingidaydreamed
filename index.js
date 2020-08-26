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

//Retrieve data from firebase
firebase.database().ref('/playlists/').once('value').then(function(snapshot) {
  const data = snapshot.val();
  console.log(data);

  const playlistNames = Object.keys(data);
  let section_flag = true; //used to switch between the two types of sections (picture to the left or right)

  for(const name of playlistNames){
    const description = data[name].description;
    const img = data[name].cover_art;
    const genre = data[name].genre;
    const hashtag = data[name].hashtags;
    if (section_flag === true){
      createPlaylistSection(name, description, img, genre, hashtag);
    }else{
      createPlaylistSection2(name, description, img, genre, hashtag);
    }
    section_flag = !(section_flag);
  }
});

//create the playlist section 1 divs (picture on the right)
function createPlaylistSection(name, description, img, genre, hashtag){
  const section = document.createElement("div");
  section.setAttribute("class", "row no-gutters");
  const section_img = document.createElement("div");
  section_img.setAttribute("class", "col-lg-6 order-lg-2 text-white showcase-img");
  section_img.setAttribute("style", "background-image: url('"+img+"');");
  section.appendChild(section_img);
  const section_text = document.createElement("div");
  section_text.setAttribute("class", "col-lg-6 order-lg-1 my-auto showcase-text");
  const section_text_h2 = document.createElement("h2");
  section_text_h2.setAttribute("style", "color:#a22a2a;");
  section_text_h2.onclick = function() {
   localStorage.setItem("storageName", name);
  }
  // section_text_h2.setAttribute("onclick", getPlaylistName(name));
  section_text_h2.innerHTML = "<a href='playlist.html'>"+name+"</a>";
  const section_text_p = document.createElement("h3");
  section_text_p.setAttribute("class", "lead mb-0");
  section_text_p.innerHTML = description;
  let genre_text = "";
  for (let g = 0; g < genre.length; g++){
    if (g === genre.length - 1){
      genre_text += genre[g];
    }else{
      genre_text += genre[g] + " · ";
    }
  }
  let hashtag_text = "";
  for (let h = 0; h < hashtag.length; h++){
    if (h === hashtag.length - 1){
      hashtag_text += "#" + hashtag[h];
    }else{
      hashtag_text += "#" + hashtag[h] + " &nbsp;&nbsp;&nbsp;";
    }
  }
  const section_text_pp = document.createElement("small");
  section_text_pp.setAttribute("class", "genres");
  section_text_pp.innerHTML = genre_text + "<br><br>";
  const section_text_ppp = document.createElement("small");
  section_text_ppp.setAttribute("class", "hashtags");
  section_text_ppp.innerHTML = hashtag_text;
  section_text.appendChild(section_text_h2);
  section_text.appendChild(section_text_p);
  const br = document.createElement("br");
  section_text.appendChild(br);
  section_text.appendChild(section_text_pp);
  section_text.appendChild(section_text_ppp);
  section.appendChild(section_text);


  document.getElementById("playlist-sections").appendChild(section);
}
//create the playlist section 2 divs (picture on the left)
function createPlaylistSection2(name, description, img, genre, hashtag){
  const section2 = document.createElement("div");
  section2.setAttribute("class", "row no-gutters");
  const section_img2 = document.createElement("div");
  section_img2.setAttribute("class", "col-lg-6 text-white showcase-img");
  section_img2.setAttribute("style", "background-image: url('"+img+"');");
  section2.appendChild(section_img2);
  const section_text2 = document.createElement("div");
  section_text2.setAttribute("class", "col-lg-6 order-lg-1 my-auto showcase-text");
  const section_text_h22 = document.createElement("h2");
  section_text_h22.onclick = function() {
   localStorage.setItem("storageName", name);
  }
  section_text_h22.innerHTML = "<a href='playlist.html'>"+name+"</a>";
  const section_text_p2 = document.createElement("p");
  section_text_p2.setAttribute("class", "lead mb-0");
  section_text_p2.innerHTML = description;
  let genre_text = "";
  for (let g = 0; g < genre.length; g++){
    if (g === genre.length - 1){
      genre_text += genre[g];
    }else{
      genre_text += genre[g] + " · ";
    }
  }
  let hashtag_text = "";
  for (let h = 0; h < hashtag.length; h++){
    if (h === hashtag.length - 1){
      hashtag_text += "#" + hashtag[h];
    }else{
      hashtag_text += "#" + hashtag[h] + " &nbsp;&nbsp;&nbsp;";
    }
  }
  const section_text_pp = document.createElement("small");
  section_text_pp.setAttribute("class", "genres");
  section_text_pp.innerHTML = genre_text+ "<br><br>";
  const section_text_ppp = document.createElement("small");
  section_text_ppp.setAttribute("class", "hashtags");
  section_text_ppp.innerHTML = hashtag_text;
  section_text2.appendChild(section_text_h22);
  section_text2.appendChild(section_text_p2);
  const br = document.createElement("br");
  section_text2.appendChild(br);
  section_text2.appendChild(section_text_pp);
  section_text2.appendChild(section_text_ppp);
  section2.appendChild(section_text2);
  document.getElementById("playlist-sections").appendChild(section2);
}
