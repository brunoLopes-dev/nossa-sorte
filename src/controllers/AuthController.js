const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const AuthController = {
    register: async (req, res) => {
        const { name, email, cpf, birthdate, phone_number, password } = req.body;

        try {

            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                return res.status(400).json({ message: 'Usuário já existe' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name,
                email,
                cpf,
                birthdate,
                phone_number,
                password: hashedPassword
            });

            res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar usuário', error });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: 'Credenciais inválidas' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Credenciais inválidas' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login bem-sucedido', token });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao fazer login', error });
        }
    },

	// ! Em um cenário sem persistência de tokens, o logout é feito no cliente
    logout: (req, res) => {        
        res.status(200).json({ message: 'Logout bem-sucedido' });
    }
};

module.exports = AuthController;
