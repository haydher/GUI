document.addEventListener('DOMContentLoaded', function() {
 
  const userName = "chrisfixit"
  const instaURL = `https://www.instagram.com/${userName}/?__a=1`;

  fetch(instaURL)
  .then(response => {
    return response.json();
  })
  .then(data =>{
    console.log("Connected")
    getData(data);
  })
  .catch(error =>{
    console.log(error)
  })

  function getData(data){
    const galleryContainer = document.querySelector(".gallery-container");
    const newUl = document.createElement("UL")
    const imgArray = [];
    const imgURL = [];

    for(let i = 0; i< 15; i++){
      const userData = data.graphql.user.edge_owner_to_timeline_media.edges[i];
      
      if(userData != undefined){
        const isVideo = userData.node.is_video;
        if(!isVideo){
          imgArray.push(userData.node.display_url)
          imgURL.push(userData.node.shortcode)
        }
      }
    }
    for(let i = 0; i< 6; i++){
        const newLink = document.createElement("A")
        const newLI = document.createElement("LI")
        const newIMG = document.createElement("IMG")


        newLink.href = `https://www.instagram.com/p/${imgURL[i]}`;
        newLink.target = '_blank';
        
        newIMG.src = imgArray[i]
        newLink.append(newIMG)
        newLI.append(newLink)
        newUl.append(newLI)
      }
      galleryContainer.append(newUl)

    }

}, false);

