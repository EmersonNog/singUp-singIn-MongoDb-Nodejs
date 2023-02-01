import DataModel from "../models/Dados.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { check, validationResult } from 'express-validator';
dotenv.config();

const createValidation = [
  check('name').not().isEmpty(),
  check('email').isEmail(),
  check('phone').not().isEmpty(),
  check('password').isLength({ min: 6 }),
  check('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
];

const createImageValidation = [
  check('email').isEmail()
];

const loginValidation = [
  check('email').isEmail(),
  check('password').not().isEmpty()
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

const createUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const createRegister = await DataModel.create({
    name,
    email,
    phone,
    password: passwordHash,
  });
  
    try {
      await createRegister.save();
      return res.status(201).json(createRegister);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao salvar usuário no banco de dados"
      });
    }
};

const createUserImage = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await DataModel.findOne({ email: email });
    user.photo = req.body.photo;
    await user.save(); 
    res.status(201).json({ msg: "Nova imagem adicionada!" })
  } catch (error) {
    res.status(409).json({ msg: "Erro ao salvar imagem no banco de dado!" })
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await DataModel.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado!' });
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(422).json({ msg: 'Senha inválida!' });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign({
      id: user._id
    }, secret);

    res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
        msg: 'Erro ao realizar autenticação, tente novamente mais tarde!',
        });
    }
};

const read = async (req, res) => {
    try {
        const data = await DataModel.find({});
        res.json(data);
    } catch (error) {
        res.status(409).json({ msg: error.msg });
        }
    };
    
const searchData = async (req, res) => {
    try {
        const data = await DataModel.findOne({ email: req.params.email });
        if (!data) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' });
        }
        res.json(data);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
    
export default {
    read,
    create: [createValidation, handleValidationErrors, createUser],
    createImage: [createImageValidation, handleValidationErrors, createUserImage],
    login: [loginValidation, handleValidationErrors, login],
    searchData
};