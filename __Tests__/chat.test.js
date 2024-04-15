import { createMocks } from "node-mocks-http";
import handler from "@/pages/api/chat";

describe("/api/chat Integrationstest", () => {
  test("POST-Anfrage sendet eine echte Anfrage und vergleicht mit tatsächlicher Antwort", async () => {
    const { req, res } = createMocks({
      method: "POST",
      headers: {
        cookie: "auth=" + process.env.Token,
      },
      body: {
        model: "gpt-4-turbo-preview",
        messages: [{ role: "user", content: "11*11" }],
        temperature: 0.7,
      },
    });

    await handler(req, res);

    const data = JSON.parse(res._getData()); // Extrahiere die Antwortdaten

    console.log(data.choices[0].message.content);
    expect(res.statusCode).toBe(200);
    expect(data).toHaveProperty("choices");
    expect(data.choices[0].message.content).toContain("121");
  });
});
