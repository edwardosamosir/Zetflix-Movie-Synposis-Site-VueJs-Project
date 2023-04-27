'use strict'
const { Movie, User, Genre, History } = require("../models");


class MovieController {
  static async createMovie(req, res, next) {
    const { title, synopsis, imgUrl, trailerUrl, rating, genreId } = req.body;
    const authorId  = req.user.id;
    const author = req.user.email;

    // console.log(req.user.id)
    try {
      const addedMovie = await Movie.create({
        title,
        synopsis,
        imgUrl,
        trailerUrl,
        rating,
        genreId,
        authorId,
      });

      const historyData = {
        title: addedMovie.title,
        description: `New movie with id ${addedMovie.id} has been created.`,
        updatedBy: author
      }

      const addedHistory = await History.create(historyData)
      
      res.status(201).json(
        { addedMovie,
          addedHistory,
          message: `Succesfully Added ${addedMovie.title} Movie!`
        }
      );

    } catch (err) {
      next(err)
    }
  }

  static async getAllMovies(req, res, next) {
    try {
      const allMovies = await Movie.findAll({
        include: [{model: User, as : 'author', attributes: {exclude: "password"}}, Genre],
        order: [["title", "ASC"]]
      });

      res.status(200).json(
        allMovies
      );

    } catch (err) {
        next(err);
    }
  }

  static async getMovieById(req, res, next) {
    try {
      const {id} = req.params
      const selectedMovieById = await Movie.findByPk(id, {
        include: [{model: User, as : 'author', attributes: {exclude: "password"}}, Genre]
      });

      if(!selectedMovieById) throw ({name: "NotFound"})

      res.status(200).json(
        selectedMovieById
      );

    } catch (err) {
      next(err);
    }
  }

  static async patchMovieStatusById(req, res, next) {
    const {id} = req.params;
    const {status} = req.body;
    const statusUpdater = req.user.email;

    try {
      const movieToPatch = await Movie.findByPk(id);
      if(!movieToPatch) throw ({name: "NotFound"})

      const prevStatus = movieToPatch.status;
      movieToPatch.status = status;
      const patchedMovie = await movieToPatch.save();
      // console.log(patchedMovie)

      const historyData = {
        title: patchedMovie.title,
        description: `Movie status with id ${patchedMovie.id} has been updated from ${prevStatus} to ${patchedMovie.status}`,
        updatedBy: statusUpdater
      }

      const addedHistory = await History.create(historyData)
      res.status(200).json(
        { patchedMovie,
          addedHistory,
          message: `${movieToPatch.title} movie status has been updated successfully!`
        }
      )
    } catch (err) {
      next(err);
    }
  }

  static async updateMovieById(req, res, next){
    const {id} = req.params;
    const { title, synopsis, imgUrl, trailerUrl, rating, genreId } = req.body;
    const movieUpdater = req.user.email;

    try {
      const movieToUpdate = await Movie.findByPk(id);
      if(!movieToUpdate) throw ({name: "NotFound"})

      let updatedMovieData = {
        title, 
        synopsis, 
        imgUrl, 
        trailerUrl, 
        rating, 
        genreId
      }

      let currentMovieData = {
        title: movieToUpdate.title, 
        synopsis:  movieToUpdate.synopsis, 
        imgUrl:  movieToUpdate.imgUrl, 
        trailerUrl: movieToUpdate.trailerUrl, 
        rating:  movieToUpdate.rating, 
        genreId:  movieToUpdate.genreId 
      }

      // console.log(JSON.stringify(updatedMovieData))
      // console.log(JSON.stringify(currentMovieData));

      if(JSON.stringify(updatedMovieData) === JSON.stringify(currentMovieData)) throw ({name: "NoUpdates"})

      movieToUpdate.set({
        title,
        synopsis,
        imgUrl,
        trailerUrl,
        rating,
        genreId,
      })
      const updatedMovie = await movieToUpdate.save();

      const historyData = {
        title: updatedMovie.title,
        description: `Movie with id ${updatedMovie.id} has been updated.`,
        updatedBy: movieUpdater
      }

      const addedHistory = await History.create(historyData)
      
      res.status(200).json(
        { updatedMovie,
          addedHistory,
          message: `Succesfully Updated ${updatedMovie.title} Movie!`
        }
      );

    } catch (err) {
      next(err)
    }
  }

  static async deleteMovieById(req, res, next) {
    try {
      const {id} = req.params
      const movieToDelete = await Movie.findByPk(id);

      if(!movieToDelete) throw ({name: "NotFound"})

      await Movie.destroy({
        where: {id}
      })

      res.status(200).json({
        message: `Successfully Removed ${movieToDelete.title} Movie.`
      }
      );

    } catch (err) {
      next(err);
    }
  }

  static async getAllGenres(req, res, next) {
    try {
      const allGenres = await Genre.findAll({
        order: [["name", "ASC"]]
    });

      res.status(200).json(
        allGenres
      );

    } catch (err) {
        next(err);
    }
  }

  static async createGenre(req, res, next) {
    const { name } = req.body;

    try {
      const addedGenre = await Genre.create({
        name
      });

      res.status(201).json(
        {addedGenre,
         message: `Successfully Added ${addedGenre.name} Genre.`
        }
      );

    } catch (err) {
      next(err)
    }
  }

  static async deleteGenrebyId(req, res, next) {
    try {
      const {id} = req.params
      const genreToDelete = await Genre.findByPk(id);

      if(!genreToDelete) throw ({name: "NotFound"})
      
      await Genre.destroy({
        where: {id}
      })

      res.status(200).json({
        message: `Successfully Removed ${genreToDelete.name} Genre.`
      }
      );

    } catch (err) {
      next(err);
    }
  }

  static async updateGenreById(req, res, next){
    const {id} = req.params;
    const { name } = req.body;
    
    try {
      const genreToUpdate = await Genre.findByPk(id);
      if(!genreToUpdate) throw ({name: "NotFound"})

      let updatedGenreData = {
        name
      }

      let currentGenreData = {
        name: genreToUpdate.name
      }

      // console.log(JSON.stringify(updatedMovieData))
      // console.log(JSON.stringify(currentMovieData));

      if(JSON.stringify(updatedGenreData) === JSON.stringify(currentGenreData)) throw ({name: "NoUpdates"})
      
      genreToUpdate.set({
        name
      })
      const updatedGenre = await genreToUpdate.save();

      res.status(200).json(
        {updatedGenre,
         message: `Successfully Updated ${updatedGenre.name} Genre.`
        }
      );

    } catch (err) {
      next(err)
    }
  }

  static async getHistoryLogs(req, res, next) {
    try {
      const allHistory = await History.findAll({
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({
        allHistory,
        message: "History data collected succesfully",
      });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = MovieController;
