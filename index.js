//Import Dependencies
const express = require("express");
const Joi = require("joi");
const bodyParser = require("body-parser");

//initiate
const PORT = process.env.PORT || 3000;
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//Express Json
app.use(express.json());
//data
const genres = [
  { id: 1, genre: "action" },
  { id: 2, genre: "comedy" },
];

//ROUTES
app.get("/api/genres", (req, res) => {
  res.status(200).send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((gen) => gen.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The Genre with given ID was not found");

  res.send(genre);
});
app.post("/api/genres", (req, res) => {
  const { error } = validationGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    genre: req.body.genre,
  };

  genres.push(genre);
  res.send(genre);
});
app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((gen) => gen.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The Genre with given ID was not found");

  const { error } = validationGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.genre = req.body.genre;

  res.send(genre)
  
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((gen) => gen.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The Genre with given ID was not found");

  //delete
  const index = genres.indexOf(genre);
  genres.splice(index, 1)

  res.send(genre)
});

//Error handler JOI
function validationGenre(genre) {
  const schema = Joi.object({
    genre: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}
app.listen(PORT, () => console.log(`Listening port ${PORT}`));
