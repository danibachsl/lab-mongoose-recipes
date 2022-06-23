const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    console.log("Base de datos limpia!");
    Recipe.create({
      title: "Paella de la buena",
      level: "UltraPro Chef",
      ingredients: ["a", "b", "c", "d", "e", "f", "g"],
      cuisine: "Spanish",
      dishType: "main_course",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Paella_valenciana_01.jpg/2560px-Paella_valenciana_01.jpg",
      duration: 120,
      creator: "Chef Ramsay"
    })

    return Recipe.insertMany(data);
  })
  .then((data) => {
    console.log("Recipes insertadas");

    return Recipe.findOneAndUpdate(
      { name: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true } // Receta actualizada
    );
  })
  .then((data) => {
    console.log("Recipe duration update has been successful!");

    return Recipe.deleteOne({ name: "Carrot Cake" });
  })
  .then((data) => {
    console.log("Carrot Cake recipe deleted successfully!");
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.close()