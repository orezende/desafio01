const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  const respositoryToCreate = {
    url,
    title,
    techs,
    likes: 0,
    id: uuid()
  };

  repositories.push(respositoryToCreate);

  return response.status(201).json(respositoryToCreate)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const { url, title, techs } = request.body;

  const repositoryIndexToUpdate = repositories
    .findIndex(repository => repository.id === id);

  if (repositoryIndexToUpdate < 0) {
    return response.status(400).send();
  }

  repositories[repositoryIndexToUpdate] = {
    url,
    title,
    techs,
    id,
    likes: repositories[repositoryIndexToUpdate].likes
  };

  return response.status(200).json(repositories[repositoryIndexToUpdate]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndexToDelete = repositories
    .findIndex(repository => repository.id === id);

  if (repositoryIndexToDelete < 0) {
    return response.status(400).send();
  }

  repositories.splice(repositoryIndexToDelete, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndexToAddLike = repositories
    .findIndex(repository => repository.id === id);

  if (repositoryIndexToAddLike < 0) { 
    return response.status(400).send();
  }

  repositories[repositoryIndexToAddLike].likes =
    repositories[repositoryIndexToAddLike].likes + 1;

  return response.status(200).json(repositories[repositoryIndexToAddLike]);
});

module.exports = app;
