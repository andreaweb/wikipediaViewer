//I chose the keydown approach because it kinda works real-time and dismisses the need to click or press Enter
$('input[type=search]').on('keydown', function(e) {  
  //just creating vars to use later when building the HTML
  var mainOpen = "<main>";
  var mainClose = "</main>";
  var titleOpen = "<h4 class='titulo'>";
  var titleClose = "</h4>";
  var summaryOpen = "<p class='resumo'>";
  var summaryClose = "</p>";
  var link;

  //get the value being typed in the input field
  var search = document.getElementsByName("search")[0].value;
  
  //replace any spaces by + (it's how the API rolls)
  (function replaceSpace() {
    search = search.replace(/\s/g, "+");
  })();
  
  //calls API and constructs HTML
 (function() {
    var mediaAPI = 'https://en.wikipedia.org/w/api.php?action=query&format=json&callback=?&generator=allpages&gaplimit=10&gapfilterredir=nonredirects&gapfrom='+search+'&prop=links%7Cpageimages%7Cpageterms&rvprop=content';
    $.getJSON(mediaAPI, {

    })
    
  
    .done(function(data) {
      //empties the div to display the new results
      $('.queryResults').empty();
      
      //gets data from each page in the data.query
      $.each(data.query.pages,function(i,item){
        
        //creates each link from the title, replacing characters that would cause errors
        (function createLink(){
            link = data.query.pages[i].title.replace(/\s/g, "_");
            link = link.replace(/'/g,"%27")
        })();
        
        //only prints the image if there is one in the database
        if (data.query.pages[i].hasOwnProperty("thumbnail")) {
         $(".queryResults").append("<a target='_blank'  href='https://en.wikipedia.org/wiki/"+link+"'><img src='"+data.query.pages[i].thumbnail.source+"' width='"+data.query.pages[i].thumbnail.width+"' height='"+data.query.pages[i].thumbnail.height+"' ></a>");
        }
        
        //print title
        $(".queryResults").append("<a target='_blank'  href='https://en.wikipedia.org/wiki/"+link+"'>"+titleOpen+data.query.pages[i].title+titleClose+"</a>");
        
        //print description if there is one
        if (data.query.pages[i].terms.hasOwnProperty("description")) {
          $(".queryResults").append(summaryOpen+data.query.pages[i].terms.description+summaryClose);
        }
        
      });
    }) 
  })();
})