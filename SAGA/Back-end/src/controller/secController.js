import { prisma } from "../util/prisma.js";
import { Prisma } from '@prisma/client';



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
        const { id_user } = req.params
        const { nome, email, senha, dt_nasc, telefone, cpf, ft_perfil, tipo } = req.body

        const usuario = await prisma.user.update({ where: { id_user },
             data: { nome, email, senha, dt_nasc, telefone, cpf, ft_perfil, tipo } })
        return res.json(usuario)
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
        const { id_user } = req.params;

    }
}       