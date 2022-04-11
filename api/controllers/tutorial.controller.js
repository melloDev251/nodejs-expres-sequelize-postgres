const db = require('../models')
const Tutorial = db.tutorials // définition de la table
const Op = db.Sequelize.Op

const getPagination = (page, size) => {
    const limit = size ? +size : 3
    const offset = page ? page * limit : 0
    return { limit, offset }
}

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data
    const currentPage = page ? +page : 0
    const totalPages = Math.ceil(totalItems / limit)
    return { totalItems, tutorials, totalPages, currentPage }
}

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // validate request
    if (!req.body.title) {
        res.status(400).send({
            message: 'le champ title ne doit pas être vide !',
        })
        return
    }

    const tutorial = {
        // create tutorial
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
    }

    // save tutorial
    Tutorial.create(tutorial)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'error lors de la création du nouveau tutorial',
            })
        })
}

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const { page, size, title } = req.query
    // const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null
    const { limit, offset } = getPagination(page, size)
    Tutorial.findAndCountAll({ where: condition, limit, offset })
        .then((data) => {
            const response = getPagingData(data, limit, page)
            res.send(response)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "error lors de l'affichage de tout les tutorials",
            })
        })
}

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id
    Tutorial.findByPk(id)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: "error lors de l'affichage du tutorial id=" + id,
            })
        })
}

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id
    Tutorial.update(req.body, { where: { id: id } })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'tutorial MAJ avec success',
                })
            } else {
                res.send({
                    message: `MAJ tutorial with id=${id}. Et ce contenu n'existe pas sur req.body `,
                })
            }
        })
        .catch(() => {
            res.status(500).send({
                message: 'error lors de la modification du tutorial id=' + id,
            })
        })
}

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id
    Tutorial.destroy({ where: { id: id } })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'tutorial SUPPRIMER avec success',
                })
            } else {
                res.send({
                    message: `SUPPRIMER tutorial with id=${id}. Et ce contenu n'existe pas sur la base `,
                })
            }
        })
        .catch(() => {
            res.status(500).send({
                message: 'error lors de la suppression du tutorial id=' + id,
            })
        })
}

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {}

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    const { page, size } = req.query
    const { limit, offset } = getPagination(page, size)
    Tutorial.findAndCountAll({ where: { published: true }, limit, offset })
        .then((data) => {
            const response = getPagingData(data, page, limit)
            res.send(response)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving tutorials.',
            })
        })
}
