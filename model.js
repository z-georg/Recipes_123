
class User {

    constructor(){
       
        this.myFavouriteRecipes = [];
        this.myCookedRecipes = [];
        this.username;
        this.age;
        this.address;
        this.userimg;

    }

    addFavourites(recipe){
      
        if(this.myFavouriteRecipes.indexOf(recipe) === -1){
            this.myFavouriteRecipes.push(recipe);
        }
    }

    unlike(recipe){
        let idx = this.myFavouriteRecipes.indexOf(recipe);
        if(idx !== -1){
            this.myFavouriteRecipes.splice(idx, 1);
        }
    }


    isLiked(recipe){
        return this.myFavouriteRecipes.indexOf(recipe) !== -1;
    }



    isCooked(recipe){
        return this.myCookedRecipes.indexOf(recipe) !== -1;
    }

   

}
class Recipe{

    constructor(title, href, ingredients, thumbnail){
            this.name = title;
            this.link = href;
            this.ingredients = ingredients;
            this.picture = thumbnail;
            this.timesCookedByUser =1;
    }
    
    
    cookedTimes(){
        this.timesCookedByUser +=1;
    }


}

class RecipeManager {

    constructor(){
        this.allrecipes = [];
    }

    add(recipe){
        if(recipe instanceof Recipe){
            if(this.allrecipes.indexOf(recipe) === -1){
                this.allrecipes.push(recipe);
            }
        }
    }


    search(text){
        if(typeof(text) === "string" && text.trim().length > 0){
            //return all recipes whose first name and/or last name contain the txt
            let searched = [];
            text = text.toLowerCase();
            for(let i = 0; i < this.allrecipes.length; i++){
                let recipe = this.allrecipes[i];
                if( recipe.name.toLowerCase().includes(text)){searched.push(recipe);}
            }
            return searched;
        }

    }

    filter(text){
       
            let filtered = [];
    
            for(let i = 0; i < this.allrecipes.length; i++){
                let recipe = this.allrecipes[i];
                let ingredinets = this.allrecipes[i].ingredients;
                if( ingredinets.includes(text)){filtered.push(recipe);}
            }
            return filtered;
        

    }

 //   filterGucci(text){
  //      text = text.toLowerCase();
 //       return this.tupalki.filter(t => t.fullName.toLowerCase().includes(text) || t.email.toLowerCase().includes(text));
  //  }


}
