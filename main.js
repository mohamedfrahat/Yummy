
$('.menu-botton ').click(function (e) {
  $('nav').css({ left: '15%' })
  $('.menu').addClass('d-none');
  $('.btn-close').removeClass('d-none');
  $('.nav-links').slideDown(500);
  $('.nav-footer').show(500);


  $('.btn-close').click(function (e) {


    $('nav').css({ left: '0%' })
    $('.btn-close').addClass('d-none');
    $('.menu').removeClass('d-none');
    $('.nav-links').slideUp(500);
    $('.nav-footer').hide(500);
  });




});

$('.nav-links a').click(function (e) {

  $('nav').css({ left: '0%' })
  $('.btn-close').addClass('d-none');
  $('.menu').removeClass('d-none');
  $('.nav-links').slideUp(500);
  $('.nav-footer').hide(500);
  $('.tap').addClass('d-none');
  // $('.main').removeClass('d-none');
  $('.meardetails').addClass('d-none');
  dipslaypage(e.target.innerHTML)

})

////////////////////displaymeal////////
async function getdata(meal) {

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`).then((response) => response.json());
  if (meal == '')
    $('.main-div .container .row').html(displaymeal(res.meals));
  else {
    $('.search-tap .container .row').html(displaymeal(res.meals));
  }
}
getdata('');

function displaymeal(res) {

  let cartona = ``;

  for (let index = 0; index < res.length; index++) {


let id = res[index].idMeal;
console.log();
    cartona += `
<div class="col-md-3  ">
  <div class="meal " onclick="getmealdetails(${id})">
    <img class="img-fluid " src=${res[index].strMealThumb}>
  <div class="layer d-flex align-items-center ">
    <p>${res[index].strMeal}</p>
  </div>
  </div>
  
</div>
`;



  }
  return cartona

}




////////////////////searchByFLetter////////
async function searchByFLetter(meal) {

  console.log('hello');
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${meal}`).then((response) => response.json());
  $('.search-tap .container .row').html(displaymeal(res.meals));

}

////////////////////displayCategory////////
function displayCategory(res) {
  let cartona = ``;
  // console.log(res[0].strCategory);
  for (let index = 0; index < res.length; index++) {



    cartona += ` <div class="col-md-3">
      <div onclick="getCategoryMeals('${res[index].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src=${res[index].strCategoryThumb} alt="" srcset="">
          <div class="layer position-absolute text-center text-black p-2">
              <h3>${res[index].strCategory}</h3>
              <p>${res[index].strCategoryDescription}</p>
          </div>
      </div>
</div>
    `;

    // console.log(cartona);

  }
  return cartona
}
async function searchByCategy() {

  // console.log('hello');
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`).then((response) => response.json());
  // console.log(res.categories);

  $('.Category').html(displayCategory(res.categories));

}
////////////////////displayArea////////
function displayArea(res) {
  let cartona = ``;
  // console.log(res[0].strArea);
  for (let index = 0; index < res.length; index++) {



    cartona += ` <div class="col-md-3">
          <div onclick="getAreaMeals('${res[index].strArea}')" class="rounded-2 text-center cursor-pointer">
                  <i class="fa-solid fa-house-laptop fa-4x"></i>
                  <h3>${res[index].strArea}</h3>
          </div>
  </div>
        `;

    // console.log(cartona);

  }
  return cartona
}
async function searchByArea() {

  // console.log('hello');
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`).then((response) => response.json());
  // console.log(res.meals);

  $('.Area').html(displayArea(res.meals));

}
////////////////////displayIngredients////////
function displayIngredients(res) {
  let cartona = ``;

  for (let index = 0; (index < res.length && index < 20); index++) {



    cartona += `
    <div class="col-md-3">
                <div onclick="getIngredientsMeals('${res[index].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${res[index].strIngredient}</h3>
                        <p>${res[index].strDescription.split(' ').splice(0, 15).join(' ')}</p>
                </div>
        </div>

  `;

  }
  return cartona
}


async function searchByIngredients() {

  // console.log('hello');
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  res = await res.json()
  // console.log(res.meals);
  $('.Ingredients').html(displayIngredients(res.meals));

}



function dipslaypage(page) {

  $('.main').removeClass('d-none')
  if (page == 'Search') {
    $('#searchContainer').removeClass('d-none')

  }

  else if (page == 'Categories') {

    $('#Categories').removeClass('d-none')
    searchByCategy();

  }
  else if (page == 'Area') {
    $('#Area').removeClass('d-none')
    searchByArea();
  }
  else if (page == 'Ingredients') {
    $('#Ingredients').removeClass('d-none')
    searchByIngredients();
  }
  else if (page == 'Contact Us') {
    $('#Contact-Us').removeClass('d-none')

  }
}

async function getCategoryMeals (Category)
{

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`);
  res= await res.json();

  $('.Category').html(displaymeal(res.meals));
 
}
async function getAreaMeals (Area)
{

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`);
  res= await res.json();

  $('.Area').html(displaymeal(res.meals));
 
}

async function getIngredientsMeals (Ingredients)
{

  // console.log(Ingredients);
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`);
  
  res= await res.json();
  // console.log(res);
  $('.Ingredients').html(displaymeal(res.meals));
 
}


async function getmealdetails(id){
  console.log(id);

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  res= await res.json();
  console.log(res.meals[0]);
  dilplaymealdetaisl( res.meals[0]);
  
 
}

function dilplaymealdetaisl (meal){
 
  // console.log(meal);
  let cartona =``
 cartona =`
  
<div class="vh-100 position-relative text-white ">
     
        <div class="container">
            <div class="row py-5 g-4 " id="rowData">
    <div class="col-md-4">
                <img class="w-100 rounded-3" src=${meal.strMealThumb} alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-info m-2 p-1">1 cup  Lentils</li><li class="alert alert-info m-2 p-1">1 large Onion</li><li class="alert alert-info m-2 p-1">1 large Carrots</li><li class="alert alert-info m-2 p-1">1 tbs Tomato Puree</li><li class="alert alert-info m-2 p-1">2 tsp Cumin</li><li class="alert alert-info m-2 p-1">1 tsp  Paprika</li><li class="alert alert-info m-2 p-1">1/2 tsp Mint</li><li class="alert alert-info m-2 p-1">1/2 tsp Thyme</li><li class="alert alert-info m-2 p-1">1/4 tsp Black Pepper</li><li class="alert alert-info m-2 p-1">1/4 tsp Red Pepper Flakes</li><li class="alert alert-info m-2 p-1">4 cups  Vegetable Stock</li><li class="alert alert-info m-2 p-1">1 cup  Water</li><li class="alert alert-info m-2 p-1">Pinch Sea Salt</li>
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    
        <li class="alert alert-danger m-2 p-1">${meal.strTags}</li>
                </ul>

                <a target="_blank" href=${meal.strSource} class="btn btn-success">Source</a>
                <a target="_blank" href=${meal.strYoutube} class="btn btn-danger">Youtube</a>
            </div></div>
        </div>
    </div>

`
$('.meardetails').html(cartona);
$('.main').addClass('d-none');
$('.meardetails').removeClass('d-none');


}


function inputsValidation(email) {
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    console.log("Email is valid");
  } else {
    console.log("Email is not valid");
  }
  
}

