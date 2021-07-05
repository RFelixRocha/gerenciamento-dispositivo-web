const db = require("../models/index");
const DeviceController = db.device;

//Cadastro de categoria
exports.create = (req, res) => {
    // Validação
    if (!req.body.category || !req.body.color || !req.body.partNumber) {
      res.status(422).send({
        message: "Todos os campos são obrigatórios!"
      });
      return;
    }

    //Objeto com os parametros
    const device = {
      color: req.body.color,
      partNumber: req.body.partNumber,
      categoryId: req.body.category
    };

    //Cadastro do dispositivo
    DeviceController.create(device)
      .then(data => {
        res.status(201).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro ao cadastrar o novo dispositivo."
        });
      });
  };

//update do dispositivo
exports.update = (req, res) => {

    const id = req.params.id;

    DeviceController.update(req.body, {
        where: { id: id }
    })
        .then(result => {

            if (result == 1) {

                res.status(200).send({
                    message: "Dispositivo atualizado com sucesso."
                });

            } else {
                res.status(404).send({
                    message: "Dispositivo não encontrado"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao atualizar o dispositivo"
            });
        });
};

  //Lista todos os dispositivos.
  exports.findAll = (req, res) => {
    DeviceController.findAll({
        include: db.category
       })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro ao listar os dispositivos."
        });
      });
  };

  //Busca um dispositivo
    exports.findOne = (req, res) => {

        const id = req.params.id;

        DeviceController.findOne({
            where:{ id:id },
            include:[db.category]
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
                    message: "Erro ao buscar o dispositivo com o id=" + id
                });
            });

    };


  // Deleta um dispositivo
  exports.delete = (req, res) => {

    const id = req.params.id;

    DeviceController.destroy({
      where: { id: id }
    })
      .then(num => {

        if (num == 1) {

          res.status(200).send({
            message: "Dispositivo deletado com sucesso!"
          });

        } else {

          res.status(404).send({
            message: "Registro não encontrado."
          });

        }

      })
      .catch(err => {
        res.status(500).send({
          message: "Não foi possível excluir o dispositivo com o  id=" + id
        });
      });
  };
