const User = require('../model/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('express')

exports.registro = async (req, res) => {
    const { nome, email, senha, confsenha } = req.body

    if(!nome) {
        return res.status(422).send({ msg: 'É obrigatório preencher este campo!'})
    }

    if(!email) {
        return res.status(422).send({ msg: 'É obrigatório preencher este campo!'})
    }

    if(!senha) {
        return res.status(422).send({ msg: 'É obrigatório preencher este campo!'})
    }

    if(senha !== confsenha) {
        return res.status(422).send({ msg: 'As senhas não são iguais!'})
    }

    const userExists = await User.findOne({email: email})

    if(userExists) {
        return res.status(422).send({ msg: 'Este e-mail já está cadastrado!'})
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(senha, salt)

    const user = new User({
        nome,
        email,
        senha: passwordHash,
    })

    try{
        await user.save()
        res.redirect('/auth/login')

    }catch(error){
        console.log(error)
        res.status(500).send({msg: 'Ocorreu um erro.'})
    }
}

exports.login = async (req, res) => {
    const { email, senha } = req.body

    const user = await User.findOne({ email: email})

    if(!user) {
        return res.status(404).send({ msg: 'Usuário não encontrado!'})
    }

    //

    const checkSenha = await bcrypt.compare(senha, user.senha)

    if(!checkSenha){
        return res.status(422).send({ msg: 'A senha está incorreta!'})
    }

    try {

        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user._id,
        },
        secret,
        )

        res.status(200).send({msg: 'Autenticação realizada com sucesso!', token })

    } catch(err) {
        console.log(err)
        res.status(500).send({msg: 'Ocorreu um erro.'})
    }
}
