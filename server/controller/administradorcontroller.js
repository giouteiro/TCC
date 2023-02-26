const { response } = require('express');
var Administradordb = require('../model/administrador');

exports.createadministrador = async (req, res) => {
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

    const administradorExists = await Admnistrador.findOne({email: email})

    if(administradorExists) {
        return res.status(422).send({ msg: 'Este e-mail já está cadastrado!'})
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(senha, salt)

    const administrador = new Administrador({
        email,
        senha: passwordHash,
    })

    try{
        await administrador.save()
        res.redirect('/adminlogin')

    }catch(error){
        console.log(error)
        res.status(500).send({msg: 'Ocorreu um erro.'})
    }
}