import { request, response } from "express";
import bcrypt from 'bcryptjs'
import { prisma } from "../util/prisma.js";

export class UserController {
    async create(req, res) {
        const { nome, email, senha, dt_nasc, telefone, cpf, ft_perfil, tipo } = req.body

        const emailHsh = await prisma.user.findUnique({ where: { email } })

        if (emailHsh) {
            return res.json({ error: "Email já cadastrado" })
        }
        const senhaHash = await bcrypt.hash(senha, 10);

        await prisma.user.create({
            data: {
                nome,
                email,
                senha: senhaHash,
                dt_nasc,
                telefone,
                cpf,
                ft_perfil,
                tipo
            }
        })
        console.log("Cadastro concluido com sucesso")
        return res.json({ message: "Cadastro concluido com sucesso" })

    }
}