
(function(){
    


    let results = getById("results");
    let error = getById("Error");
    let allRecepies = getById("AllRecepies");
    let favourites = getById("Favourites");
    let create = getById("Create");
    let myProfile = getById("MyProfile");


    let user = new User();
    let manager = new RecipeManager();


   
    //create recepies
    for (let i = 0; i < rawRecipes.length; i++) {
        let obj = rawRecipes[i];
        let recipe = new Recipe(
            obj.title,
            obj.href,
            obj.ingredients,
            obj.thumbnail,
           
    
        );
        manager.add(recipe)
    }



    //  print recipes as table for user page


            function printAsTable(all, container){

                container.innerHTML = "";
                let table = document.createElement("table");
                let tr1 =  document.createElement("tr");
                let th1 = document.createElement("th");
                let th2 = document.createElement("th");
                th1.innerHTML = "recipe name";
                th2.innerHTML = "cooked ... times"
               
                tr1.append(th1, th2);
                table.append(tr1)
                
                all.forEach(element => {

                    let tr = document.createElement("tr");
                    let td1 =  document.createElement("td");
                    let td2 = document.createElement("td");
                    td1.innerHTML = element.name;


                    td2.innerHTML = element.timesCookedByUser;
                    td2.setAttribute("id",element.name)
    
                

                    tr.append(td1,td2)
                    table.append(tr)
                   

                    
                });

                container.append(table)


        
        }

    //  print recipes as cards with images

            function printRecipes(all, container) {
                container.innerHTML = "";

                all.forEach(element => {
                    let recipe = element;
     

                    let div = document.createElement("div");
                    div.classList.add("card");


                    let h5 = document.createElement("h5");
                    h5.innerHTML = recipe.name;
                    h5.classList.add("recipeName")
                    

                    let a = document.createElement("a");
                    a.href = recipe.link;


                    let img = document.createElement("img");
                    img.src = recipe.picture;
                    img.classList.add("recipeImage")
                    img.alt = "recipe";
        
                    let h3 = document.createElement("h3");
                    h3.innerHTML = recipe.ingredients;
                    h3.classList.add("ingredients")

                    let divButtons = document.createElement("div");
                    divButtons.id = "divButtons";

                    let buttonAddToFavourites = document.createElement("button");
                    buttonAddToFavourites.id = "buttonAddToFavourites";
                    
            
                    let buttonCook = document.createElement("button");
                    buttonCook.id = "buttonCook";


                    divButtons.append(buttonAddToFavourites,buttonCook);
                    a.appendChild(img);
                    div.append(a, h5, h3, divButtons);
                    container.append(div);

                    if(user.isLiked(recipe)){
                        div.classList.add("liked");
                        buttonAddToFavourites.innerText = "Премахни от любими";
                        buttonAddToFavourites.parentElement.parentElement.style.backgroundColor = "pink";

                        buttonAddToFavourites.addEventListener("click", function () {
                            user.unlike(recipe);
                            handleHashChange();
                        });
                    }
                    else{
                        buttonAddToFavourites.innerText = "Добави в любими";
                        buttonAddToFavourites.addEventListener("click", function () {
                            user.addFavourites(recipe);
                            
                            handleHashChange();
                        });
                    }

               
               

                if(user.isCooked(recipe)){
                    buttonCook.innerText = "Сготви пак";
                    buttonCook.addEventListener("click", function () { recipe.cookedTimes();})
                   
                   
                }

                else{
                    buttonCook.innerText = "Сготви"; 
                    buttonCook.addEventListener("click", function () {
                        user.myCookedRecipes.push(recipe);
                        handleHashChange();
                        });
                    
                    }
                    
                })
           
            }


    //  enable submit button for new recipe 

            var submitButtonCreateRecipe = getById("submitToCreate");
            submitButtonCreateRecipe.addEventListener("click", createNewRecipe);
            submitButtonCreateRecipe.disabled = true;
           
            var fname = getById("fname");
            var fingredients = getById("fingredients");
            var flink = getById("flink");
            var fimage = getById("fimage");

   

            fname.addEventListener("change", enableField);
            fingredients.addEventListener("change", enableField);
            flink.addEventListener("change", enableField);
            fimage.addEventListener("change", enableField);
        
        
        
            function enableField(){

                if (fname.value !== "" &&  fingredients.value !== "" && flink.value !== "" && fimage.files[0] !== ""){submitButtonCreateRecipe.disabled = false;
            }}
            
    //  create new recipe form

function createNewRecipe(event){
      
    event.preventDefault();

    var fname = ById("fname").value;
    var fingredients = getById("fingredients").value;
    var flink = getById("flink").value;
    var fimage = getById("fimage").files[0];
    var newUrl = URL.createObjectURL(fimage);

    if (fname !== "" &&  fingredients !== "" && flink !== "" && fimage !== ""){
            var recipe = new Recipe(title=fname, href=flink, fingredients, thumbnail= newUrl);
            
            manager.allrecipes.unshift(recipe);
    
            getById("fname").value = "";
            getById("fingredients").value = "";
            dgetById("flink").value = "";
            getById("fimage").value = "";
            submitButtonCreateRecipe.disabled = true;

        }}

    
    //  update user info

var userSubmitButton = getById("userSubmitButton");
userSubmitButton.addEventListener("click", userUpdate)

    function userUpdate(event){
        event.preventDefault();
        var headerUserPhoto = getById("userphoto");
        var userFormImage = getById("userFormImage").files[0];
        var userPhotoUrl = URL.createObjectURL(userFormImage);

        headerUserPhoto.src = userPhotoUrl;
    
           
        }


            //  search in all recipes

        let search = getById("search-field");
        let homeResults = getById("searchResults");
        let clearFilterButton = getById("clearFilterButton");
        clearFilterButton.addEventListener("click", function(){homeResults.style.display="none";} )
        search.addEventListener("keyup", function(event){
            //get the value of the input
            let text = event.target.value;
            //check all recipes that have this input in their names
            let searched = manager.search(text);
            //print THEM!
            homeResults.style.display="flex";
            printRecipes(searched, homeResults);
    
        })

        let ingredinetsSet = new Set();
        let filterSelectIngredients = getById("ingredients");
        


        //  filter in all recipes

        function filterIngredients(){
            

            
            for (let i=0; i< manager.allrecipes.length; i++){
              
                let recipeIngredients =  manager.allrecipes[i].ingredients;
                recipeIngredients = recipeIngredients.split(", ")
                for(let j=0; j< recipeIngredients.length; j++){
                    ingredinetsSet.add(recipeIngredients[j])
                }
                
            }
        
        }

        filterIngredients();


        for (let i of ingredinetsSet){
            let option = document.createElement("option");
            option.innerHTML = i;
            filterSelectIngredients.appendChild(option);
          
            
        }
        

        filterSelectIngredients.addEventListener("click", showFiltered)
       function showFiltered(event){
        homeResults.style.display="flex";
        let text = event.target.value;

        //check all recipes if they have this input in their ingredients
        let filtered = manager.filter(text);
        //print THEM!
        printRecipes(filtered, homeResults);


       }
       

    let handleHashChange = function () {
        let hash = location.hash.slice(1);


        if (hash !=  "AllRecepies" 
        && hash  !=  "Favourites" 
        && hash !=  "" 
        && hash  !=  "Create" 
        && hash  !=  "MyProfile"){
            hash = "Error"
        }
        switch (hash) {
            
            case "Error":
                error.style.display = "flex";
                allRecepies.style.display = "none";
                favourites.style.display = "none";
                create.style.display = "none";
                myProfile.style.display = "none";
                results.style.display = "none";

                break;
            case "AllRecepies":

                error.style.display = "none";
                allRecepies.style.display = "block";
                favourites.style.display = "none";
                create.style.display = "none";
                myProfile.style.display = "none";
                results.style.display = "flex";

                printRecipes(manager.allrecipes, results);
                
                break;
            case "Favourites":

                error.style.display = "none";
                allRecepies.style.display = "none";
                favourites.style.display = "flex";
                create.style.display = "none";
                myProfile.style.display = "none";
                results.style.display = "none";
                printRecipes(user.myFavouriteRecipes, favourites)
                break;
            case "Create":
                error.style.display = "none";
                allRecepies.style.display = "none";
                favourites.style.display = "none";
                create.style.display = "flex";
                myProfile.style.display = "none";
                results.style.display = "none";

                break;
            case "MyProfile":
                error.style.display = "none";
                allRecepies.style.display = "none";
                favourites.style.display = "none";
                create.style.display = "none";
                myProfile.style.display = "flex";
                results.style.display = "none";
                printAsTable(user.myCookedRecipes, myProfileTable)
                break;
          
            default:
                error.style.display = "none";
                allRecepies.style.display = "block";
                favourites.style.display = "none";
                create.style.display = "none";
                myProfile.style.display = "none";
                printRecipes(manager.allrecipes, results)
                

                break;
        }
    };

    window.addEventListener("load", handleHashChange)
    window.addEventListener("hashchange", handleHashChange);

   



})()