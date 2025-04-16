document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita recarregar a página

    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value; // 'senha' para corresponder à API

    try {
        const response = await fetch("http://localhost:8081/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token, data.id_user); // Salva o token JWT
            localStorage.setItem("id_user", data.id_user);
            switch (data.tipo) {
                case 1:
                   window.location.href = "../../Front-End/Secretaria/HomeSecretaria.html"; // Redireciona para a área protegida
                    break;
                case 2:
                    window.location.href = "../../Front-End/Professor/HomeProfessor.html"; // Redireciona para a área protegida
                    break;
                case 3:
                     window.location.href = "../../Front-End/Aluno/HomeAluno.html"; // Redireciona para a área protegida
                    break;

            }
            
        } else {
            alert("Erro: " + data.error);
        }
    } catch (error) {
        console.error("Erro ao conectar com a API:", error);
    }
});
