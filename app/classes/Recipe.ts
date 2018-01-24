class Recipe {
    id: number;
    title: string;
    image_url: string;
    ingredients: string[];
    calories: number;
    //ratings: rating[];
    cooking_directions: string;
    //health_tag: [health_enum] 

    constructor(id: number, title: string, image_url: string) {
        this.id = id;
        this.title = title;
        this.image_url = image_url;
        this.ingredients = [];
    }

    add_ingredients(ingredient: string) {
        this.ingredients.push(ingredient);
    }

}