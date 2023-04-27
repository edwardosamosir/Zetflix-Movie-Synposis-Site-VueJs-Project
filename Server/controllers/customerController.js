const { Customer, CustomerFavorite, User, Movie, Genre } = require("../models");
const { compareHash } = require("../helpers/password-hashing-bcrypt");
const { encodeToken } = require("../helpers/jwt-encode-decode");
const { randomString } = require("../helpers/random-string");
const { OAuth2Client } = require("google-auth-library");
const { Op } = require("sequelize");
const {default:axios} = require('axios')

class CustomerController {
    static async registerCustomer(req, res, next) {
        const { username, email, password, phoneNumber, address } = req.body;

        try {
            const newCustomer = await Customer.create({
                username,
                email,
                password,
                role: "Customer",
                phoneNumber,
                address
            });

            res.status(201).json({
                id: newCustomer.id,
                email: newCustomer.email,
                message: `User with email ${newCustomer.email} and username ${newCustomer.username} is succesfully registered`
            });
        } catch (err) {
            next(err);
        }
    }

    static async loginCustomer(req, res, next) {
        const { email, password } = req.body;

        try {
            if (!email) {
                throw { name: "email_is_required" };
            }
            if (!password) {
                throw { name: "password_is_required" };
            }

            const customer = await Customer.findOne({ where: { email } });
            if (!customer) {
                throw { name: "wrong_email_or_password" };
            }

            const isPasswordCorrect = compareHash(password, customer.password);
            if (!isPasswordCorrect) {
                throw { name: "wrong_email_or_password" };
            }

            const encodedToken = encodeToken({ id: customer.id });

            res.status(200).json({
                access_token: encodedToken,
                username: customer.username,
                email: customer.email,
                role: customer.role,
                message: `${customer.username} is successfully logged in`
            });
        } catch (err) {
            next(err);
        }
    }

    static async googleLoginCustomer(req, res, next) {
        try {
            // console.log(req.headers.google_access_token);
            const googleAccessToken = req.headers.google_access_token;
            const client = new OAuth2Client(
              "794142405359-n7ub7rrvk7nolpej3rf6f52g1k81njsl.apps.googleusercontent.com"
            );
    
            const ticket = await client.verifyIdToken({
              idToken: googleAccessToken,
              audience:
                "794142405359-n7ub7rrvk7nolpej3rf6f52g1k81njsl.apps.googleusercontent.com" // Specify the CLIENT_ID of the app that accesses the backend
            });
    
            const payload = ticket.getPayload();
            // console.log(payload);
    
            const { name, email } = payload;
    
            const password = randomString(20);
            // console.log(password)
            const [newCustomer, created] = await Customer.findOrCreate({
              where: { email },
              defaults: {
                username: name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 99999),
                email,
                password: password,
                role: "Customer"
              }
              // hooks: false
            });
    
            // console.log(payload, { newCustomer, created}, "<<<< Cek ini!!!");
    
            const encodedToken = encodeToken({ id: newCustomer.id });
    
            let role = newCustomer.role;
            let username = newCustomer.username;
    
            let code, message;
            if (created) {
              code = 201;
              message = `User with email ${email} and username ${username} is succesfully registered`;
            } else {
              code = 200;
              message = `${username} is successfully logged in`;
            }
    
            res.status(code).json({
              access_token: encodedToken,
              username: username,
              email: email,
              role: role,
              message: message
            });
        } catch (err) {
            next(err);
        }
    }

    static async getAllMoviesByCustomer(req, res, next) {
        try {
            let { filter, page } = req.query;
      
            if (filter === undefined) filter = "";
            const [titleFilter, ratingFilter, genreFilter] = filter.split(",");
      
            const limitPerPage = 9;
            const queryOption = {
              order: [["id", "ASC"]],
              include: [
                Genre,
              ],
            };
            if (page !== undefined) {
              const offset = +page > 1 ? +page - 1 : 0;
              queryOption.offset = offset * limitPerPage;
              queryOption.limit = limitPerPage;
            }
      
            if (titleFilter !== undefined && titleFilter !== '') {
              queryOption.where = {
                ...queryOption.where,
                title: {
                  [Op.iLike]: `%${titleFilter}%`,
                },
              };
            }

            if (ratingFilter !== undefined && ratingFilter !== '') {
                queryOption.where = {
                  ...queryOption.where,
                  rating: {
                    [Op.eq]: ratingFilter,
                  },
                };
              }
              
              
            const genreIdFilter = await Genre.findOne({
              where: {
                name: {
                  [Op.iLike]: `%${genreFilter}%`,
                },
              },
            });

            // console.log(genreIdFilter)
            if(genreFilter !== ''){
              if (genreIdFilter !== null) {
                queryOption.where = {
                  ...queryOption.where,
                  genreId: genreIdFilter.id,
                };
              }
              
            }
      
            const { count, rows } = await Movie.findAndCountAll(queryOption);
            const data = rows.map((el) => {
              return {
                id: el.id,
                title: el.title,
                genre: el.Genre.name,
                synopsis: el.content,
                trailerUrl: el.trailerUrl,
                imgUrl: el.imgUrl,
                rating: el.rating
              };
            });
            const result = { count, data };
      
            const maxPage = Math.ceil(count / limitPerPage);
      
            if (page !== undefined) result.page = +page;
            if (+page > 1) result.previousPage = +page - 1;
            if (+page < maxPage) result.nextPage = +page + 1;
            result.maxPage = maxPage;
      
            res.status(200).json({ result });
          } catch (err) {
            next(err);
          }
    }

    static async getAllGenresByCustomer(req, res, next) {
        try {
            const genres = await Genre.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            });
            res.status(200).json(genres);

          } catch (err) {
            next(err);
          }
    }

    static async getMovieDetail(req, res, next) {
      try {
        const { id } = req.params;
        const { origin } = req.query;
        const movie = await Movie.findByPk(id, {
          include: [
            { model: Genre, attributes: ["id", "name"] },
            { model: User, as: "author", attributes: ["id", "username"] },
          ],
        });
        
        if (!movie) throw { name: "NotFound" };
  
        let originURL
        if(origin !== undefined) {
          originURL = await CustomerController.getQRCode(origin);
          // console.log(CustomerController.getQRCode(origin))
          // console.log(originURL, '<<<<<');
          movie.dataValues.qrcode = originURL.data
        }
        res.status(200).json(movie);
      } catch (err) {
        next(err);
      }
    }

    static async getQRCode(value) {
      return axios({
        method: "post",
        url: "https://api.qr-code-generator.com/v1/create",
        params: {
          "access-token": process.env.QR_CODE_KEY,
        },
        data: {
          frame_name: "no-frame",
          qr_code_text: value,
          image_format: "SVG",
          qr_code_logo: "scan-me-square",
        },
      });
    }
    
    static async createCustomerFavorite(req, res, next) {
        try {
            const { id } = req.params;
            const CustomerId = req.user.id;
            const movie = await Movie.findByPk(id);
            if (!movie) throw { name: "NotFound" };
      
            const [createdCustomerFavorite, created] = await CustomerFavorite.findOrCreate({
              where: {
                CustomerId,
                MovieId: id,
              },
            });
      
            let message;
            if (created) {
              message = `Successfully adds ${movie.title} movie to your favorites.`;
              res.status(201).json({ createdCustomerFavorite, message });
            } else {
              message = `You had added ${movie.title} movie to your favorites already.`;
              res.status(200).json({ createdCustomerFavorite, message });
            }
            
          } catch (err) {
            next(err);
          }
    }

    static async getAllCustomerFavorites(req, res, next) {
      try {
        const CustomerId = req.user.id;
        const customerFavorites = await CustomerFavorite.findAll({
          where: { CustomerId },
          include: [
            {
              model: Movie,
              include: [{ model: Genre }],
            },
          ],
        });
    
        res.status(200).json(customerFavorites);
      } catch (err) {
        next(err);
      }
    }

}

module.exports = CustomerController;
