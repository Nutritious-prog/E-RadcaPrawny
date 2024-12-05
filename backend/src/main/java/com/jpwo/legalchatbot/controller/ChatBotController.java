package com.jpwo.legalchatbot.controller;

import com.jpwo.legalchatbot.model.ApiResponse;
import com.jpwo.legalchatbot.model.LegalAct;
import com.jpwo.legalchatbot.service.ChatBotService;
import com.jpwo.legalchatbot.service.LegalActService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/chatbot")
public class ChatBotController {

    @Autowired
    private ChatBotService chatBotService;

    @Autowired
    private LegalActService legalActService;

    @PostMapping("/start-chat")
    public void startChat() {
        List<LegalAct> laws = legalActService.getLegalActs();

        chatBotService.startChatSession(laws);
    }

    @PostMapping("/send-message")
    public ResponseEntity<ApiResponse<String>> sendMessage(@RequestBody Map<String, String> request) throws IOException {
        try {
            String message = request.get("message");
            String response = chatBotService.sendMessage(message);
            ApiResponse<String> apiResponse = new ApiResponse<>(true, response, "");
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse<>(false, null, "Error while generating chat response"), HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
}
