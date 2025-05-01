export default async function handler(req, res) {
  const { pergunta } = req.body;

  const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Você é o Prof. Cyborg, um assistente especializado em anatomia e fisiologia. Responda com clareza, didática e segurança.",
        },
        {
          role: "user",
          content: pergunta,
        },
      ],
    }),
  });

  const dados = await resposta.json();
  res.status(200).json({ resposta: dados.choices[0].message.content });
}
