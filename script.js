var movies = 
[
    { title: 'The Matrix', rating: 7.5, category: 'Action'},
    { title: 'Focus', rating: 6.9, category: 'Comedy'},
    { title: 'The Lazarus Effect', rating: 6.4, category: 'Thriller'},
    { title: 'Everly', rating: 5.0, category: 'Action'},
    { title: 'Maps to the Stars', rating: 7.5, category: 'Drama'}
];
var first_click=true;
var first_time=true;
function what_to_display()
{
  var movies_to_draw, i;
  for (i=0; i<movies.length; i++)
  {
    
  }
}
function clear_text()
{
  if (first_click==true)
    {
      first_click=false;
      var text_box=document.getElementById("search_box");
      search_box.value="";
      search_box.style.color="black";
    }
}
function erase()
{
  var parent = document.getElementById("results_box");
  while (parent.firstChild)
    {
      parent.removeChild(parent.firstChild);
    }
}
function get_text_input()
{
  var input_text= document.getElementById("search_box").value;
  return input_text;
}
function search()
{
  var input_text = get_text_input();
  if (first_time==true)
    {
      first_time=false;
      input_text="";
    }
  var i,j;
  erase();
  //var text_substrs="";
  //var important_numbers="";
  var movies_to_draw=[];
  for (i=0; i<movies.length; i++)
    {
      var current_movie=movies[i];
      var end_index=(current_movie.title.length-input_text.length+1);
      for(j=0; j<end_index; j++)
        {
          var lookin_at_text=
              current_movie.title.substr(j, input_text.length);
          //important_numbers=important_numbers+j+","+input_text.length+" : ";
          //text_substrs=text_substrs+lookin_at_text+" \n";
          if (lookin_at_text.toLowerCase()==input_text.toLowerCase())
            {
              movies_to_draw.push(current_movie);
              break;
            }
        }
    }
  //document.getElementById("test").innerHTML=text_substrs + important_numbers;
  to_draw(movies_to_draw);
}
function to_draw(movies_to_draw)
{
  var i, j, categories_and_numbers=[];
  for (i=0; i<movies.length; i++)
    {
      var movie=movies[i];
      var category=movie.category;
      var pre_existing = false;
      for (j=0; j<categories_and_numbers.length; j++)
        {
          var pre_existing_category =categories_and_numbers[j].category_name;
          if (category==pre_existing_category)
          {
            pre_existing=true;
            break;
          }
        }
      if (pre_existing==false)
      {
        var categories_entry = {category_name:category, category_number:0};
        categories_and_numbers.push(categories_entry);
      }
    }
  for (i=0; i<movies_to_draw.length; i++)
    {
      var movie = movies_to_draw[i];
      var title = movie.title;
      var rating = movie.rating;
      var category = movie.category;
      for (j=0; j<categories_and_numbers.length; j++)
        {
          var pre_existing_category =categories_and_numbers[j].category_name;
          if (category==pre_existing_category)
          {
            categories_and_numbers[j].category_number+=1;
            break;
          }
        }
    }
  categories_and_numbers.sort(function(a,b){return b.category_number - a.category_number})
  for (i=0; i<categories_and_numbers.length; i++)
    {
      var current_category=categories_and_numbers[i];
      var new_div = document.createElement('div');
      results_box.append(new_div);
      new_div.className="category_title";
      new_div.innerHTML = current_category.category_name + " ("+current_category.category_number + ")";
      var movies_in_section=[];
      for (j=0; j <movies_to_draw.length; j++)
        {
          if (movies_to_draw[j].category==current_category.category_name)
            {
              movies_in_section.push(movies_to_draw[j]);
            }
        }
      movies_in_section.sort(function(a,b){return b.rating - a.rating})
      for (j=0; j<movies_in_section.length; j++)
        { 
          var current_movie=movies_in_section[j];
          var link = document.createElement('a');
          var stars=document.createElement('p');
          var rating=Math.round(current_movie.rating/2);
          stars.innerHTML = "&#9733".repeat(rating)+ "&#9734".repeat(5-rating)+"<br>";
          link.innerHTML = current_movie.title;
          link.href="http://www.imdb.com/find?q="+current_movie.title;
          new_div = document.createElement('div');
          new_div.padding="0px";
          stars.appendChild(link);
          new_div.appendChild(stars);
          new_div.className="movie_box";
          results_box.appendChild(new_div);
        }
    }
}