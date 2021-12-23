const { response } = require('express');

const userGet = ( req, res = response) => {
    res.json({
        msg: "get API"
    });
}

const userPost = ( req, res = response) => {
    const body = req.body;

    res.json({
        msg: "post API",
        body
    });
}

const userPut = ( req, res = response) => {

    const { id } = req.params

    res.json({
        msg: "put API",
        id
    });
}

const userDelete = ( req, res = response) => {
    res.json({
        msg: "delete API"
    });
}

const userPatch = ( req, res = response) => {
    res.json({
        msg: "patch API"
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}