import { prisma } from "../util/prisma.js";
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';



export class SecController {

    async cadCurso(req, res) {
        const { nome, periodo, descricao, ch_total, freq_min } = req.body;
        const curso = await prisma.curso.create({
            data: {
                nome,
                periodo,
                descricao,
                ch_total,
                freq_min
            }
        });
        return res.json(curso);
    }

    async cadMateria(req, res) {
        const { id_curso } = req.params;
        const { nome, descricao, ch_total, freq_min } = req.body;
        const materia = await prisma.materia.create({
            data: {
                nome,
                descricao,
                ch_total,
                freq_min,
                id_curso
            }
        });
        return res.json(materia);
    }



    async editarUsuario(req, res) {
        const { id_user } = req.params;
        const { nome, email, senha, dt_nasc, telefone } = req.body;

        try {
            const usuarioExistente = await prisma.user.findUnique({
                where: { id: id_user }
            });

            if (!usuarioExistente) {
                return res.status(404).json({ erro: "Usuário não encontrado" });
            }

            const updateData = {
                nome,
                email,
                telefone,
                dt_nasc: new Date(dt_nasc)
            };

            if (senha) {
                updateData.senha = await bcrypt.hash(senha, 10);
            }

            const usuario = await prisma.user.update({
                where: { id: id_user },
                data: updateData
            });

            return res.json(usuario);
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
            return res.status(500).json({
                erro: "Erro ao editar usuário",
                detalhes: error.message
            });
        }
    }


    async excluirUsuario(req, res) {
        const { id_user } = req.params;

        try {
            await prisma.user.delete({
                where: { id: id_user }
            });

            return res.status(200).json({ message: "Usuário excluído com sucesso!" });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                return res.status(404).json({ message: "Usuário não encontrado!" });
            }

            return res.status(500).json({ message: "Erro ao excluir usuário!", error: error.message });
        }
    }

    async consultarUsuario(req, res) {
        try {
            // pega corretamente o UUID da URL
            const { id_user } = req.params;

            const usuario = await prisma.user.findUnique({
                where: { id: id_user },
                select: {
                    nome: true,
                    email: true,
                    dt_nasc: true,
                    telefone: true,
                    cpf: true,
                    ft_perfil: true,
                }
            });
    
            if (!usuario) {
                return res.status(404).json({ erro: "Usuário não encontrado" });
            }
    
            return res.json(usuario);
        } catch (error) {
            return res.status(500).json({
                erro: "Erro ao consultar usuário",
                detalhes: error.message
            });
        }
    }
}