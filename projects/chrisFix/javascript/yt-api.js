const channelID = "UCes1EvRjcKU4sY_UEavndBw";

const url = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3D${channelID}`;
let videoID;


fetch(url)
.then(response => {
  // get the data from the file and convert it into json file
  return response.json();
})
.then(data =>{
  //data is whats inside our json file
  getYTVideo(data)

})
.catch(error =>{
  //checks if any error
  apiErrorHandler()
  console.log(error)
})

const button = document.querySelector("button");

function getYTVideo(data){

  for(let i = 0; i < 4; i++){

    //makes an array of the items that "data.item." contain. 
    let {title, link, pubDate} = data.items[i];
      
    //trims video until there is a = sign to get the id of the video
    const videoID = link.substr(link.indexOf("=") + 1);
    //deletes replaces the '&' sign into 'and'
    const dltSign = title.replace("&amp;", "and");
    
    const iframeNode = `https://youtube.com/embed/${videoID}?controls=1&showinfo=0&rel=0`
    const watchVideo = 'https://youtube.com/watch?v=' + videoID;

    makeCard(iframeNode, watchVideo, dltSign)
  }

  button.addEventListener("click", ()=> {
    window.location.href = watchVideo
  })
}

// makes a new card with most recent videos
function makeCard(iframeSRC, hrefLink, videoTitle){

  // trims the length of the title
  if (videoTitle.length > 60) {
    videoTitle = videoTitle.substring(0, 62).trim();
    videoTitle = videoTitle + " ... ";
  }

  // makes all the required elements needed to make a new card
  const newDiv = document.createElement("DIV");
  const newIframe = document.createElement("IFRAME");
  const newH3 = document.createElement("h3");
  const newLink = document.createElement("a");
  const newButton = document.createElement("BUTTON");
  // adding a class and src to iframe
  newIframe.classList.add("yt-iFrame");
  newIframe.src = iframeSRC;
  newIframe.frameBorder = "0"
  // setting the title class and text
  newH3.classList.add("title");
  newH3.textContent = videoTitle;

  // button class and text
  newButton.className += "btn watch-video-btn";
  newButton.textContent = "Watch Video"

  // adding the link src and appending the button into it
  newLink.href = hrefLink;
  newLink.target = '_blank';
  newLink.appendChild(newButton)

  // appending everything into the video-card div in order
  newDiv.classList.add("video-card");
  newDiv.appendChild(newIframe);
  newDiv.appendChild(newH3);
  newDiv.appendChild(newLink);

  // appending the video card div to the parent
  videoContainer.appendChild(newDiv)
}

function apiErrorHandler(){
  const newP = document.createElement("H3");

  newP.textContent = "Ohoo! We are unable to load the recent videos." +
  " Please click the button below to watch the videos on YouTube"
  videoContainer.appendChild(newP)
}
