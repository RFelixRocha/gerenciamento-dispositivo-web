    const db = require("../models/index");
    const CategoryController = db.category;

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
    CategoryController.create(category)
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

    //update da categoria
    exports.update = (req, res) => {

    const id = req.params.id;

    CategoryController.update(req.body, {
        where: { id: id }
    })
        .then(result => {

            if (result == 1) {

                res.status(200).send({
                    message: "Categoria atualizada com sucesso."
                });

            } else {
                res.status(404).send({
                    message: "Categoria não encontrada"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao atualizar a categoria"
            });
        });
    };

    //Lista das categorias.
    exports.findAll = (req, res) => {
    CategoryController.findAll({
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

    CategoryController.findOne({
        where:{id:id},
        include:[db.device]
    })
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

    CategoryController.destroy({
      where: { id: id }
    })
      .then(result => {

        if (result == 1) {

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
