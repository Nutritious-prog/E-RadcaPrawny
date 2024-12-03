package com.jpwo.legalchatbot.service;

import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.ChatSession;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.ResponseHandler;
import com.google.cloud.vertexai.api.Content;
import com.google.cloud.vertexai.api.Part;
import com.jpwo.legalchatbot.model.LegalAct;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ChatBotService {

    private final String projectId = "first-torus-442812-a4";
    private final String location = "europe-west3";
    private final String modelName = "gemini-1.5-pro";
    private ChatSession chatSession;

    public void startChatSession(List<LegalAct> laws) {
        VertexAI vertexAI = new VertexAI(projectId, location);
        GenerativeModel model = new GenerativeModel(modelName, vertexAI);
        chatSession = model.startChat();

        StringBuilder promptBuilder = new StringBuilder("Jesteś asystentem prawnym specjalizującym się w polskim prawie.\n" +
                "Twoim zadaniem jest odpowiadanie na pytania użytkownika wyłącznie na podstawie poniższych ustaw:\n:\n\n");

        for (LegalAct law : laws) {
            promptBuilder.append("Tytuł: ").append(law.getTitle()).append("\n")
                    .append("Treść: ").append(law.getTextContent()).append("\n\n");
        }

        promptBuilder.append("W swoich odpowiedziach:\n" +
                "- Korzystaj tylko z informacji zawartych w powyższych ustawach.\n" +
                "- Nie odwołuj się do żadnych innych źródeł ani wiedzy ogólnej.\n" +
                "- Jeśli nie jesteś w stanie znaleźć odpowiedzi w podanych ustawach, poinformuj użytkownika, że nie posiadasz takiej informacji.\n" +
                "- Unikaj dodawania własnych interpretacji lub przypuszczeń.\n" +
                "- Odpowiadaj precyzyjnie i rzeczowo.");

        String prompt = promptBuilder.toString();

        Content initialContext = Content.newBuilder()
                .setRole("user")
                .addParts(Part.newBuilder().setText(prompt).build())
                .build();

        chatSession.setHistory(List.of(initialContext));
    }

    public String sendMessage(String message) throws IOException {
        Content userMessage = Content.newBuilder()
                .setRole("user")
                .addParts(Part.newBuilder().setText(message).build())
                .build();

        GenerateContentResponse response = chatSession.sendMessage(userMessage);

        return ResponseHandler.getText(response);
    }
}
