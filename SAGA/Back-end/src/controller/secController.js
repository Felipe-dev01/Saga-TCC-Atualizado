import { prisma } from "../util/prisma.js";

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


    cadTurma(req, res) {
    
    }
}