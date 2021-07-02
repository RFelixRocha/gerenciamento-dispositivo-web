const db = require("../models/index");
const Category = db.category;

//Cadastro de categoria
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(422).send({
        message: "O campo nome não pode ser vazio!"
      });
      return;
    }
  
    //Objeto com o nome da categoria
    const category = {
      name: req.body.name
    };
  
    //Cadastro da categoria
    Category.create(category)
      .then(data => {
        res.status(201).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro ao cadastrar a categoria."
        });
      });
  };
  
  //Lista das categorias.
  exports.findAll = (req, res) => {
    Category.findAll({
        include:[]
       })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro ao listar as categorias."
        });
      });
  };
  
  //Buscando uma categoria
  exports.findOne = (req, res) => {

    const id = req.params.id;
  
    Category.findByPk(id)
      .then(data => {

          if(data == null)
          {
            res.status(404).send({
              message: "Registro não encontrado."
            });

          }else res.status(200).send(data);

      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao buscar a categoria com o id=" + id
        });
      });

  };
  

  // Deleta uma categoria
  exports.delete = (req, res) => {

    const id = req.params.id;
  
    Category.destroy({
      where: { id: id }
    })
      .then(num => {

        if (num == 1) {

          res.status(200).send({
            message: "Categoria deletada com sucesso!"
          });

        } else {

          res.status(404).send({
            message: "Registro não encontrado."
          });

        }

      })
      .catch(err => {
        res.status(500).send({
          message: "Não foi possível excluir a categoria com o  id=" + id
        });
      });
  };