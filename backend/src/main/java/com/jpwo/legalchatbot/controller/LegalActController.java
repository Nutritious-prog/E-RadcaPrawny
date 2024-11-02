package com.jpwo.legalchatbot.controller;

import com.jpwo.legalchatbot.model.ApiResponse;
import com.jpwo.legalchatbot.model.LegalAct;
import com.jpwo.legalchatbot.service.LegalActService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/legal-acts")
public class LegalActController {

    private final LegalActService legalActService;

    @Autowired
    public LegalActController(LegalActService legalActService) {
        this.legalActService = legalActService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<LegalAct>>> getLegalActs() {

        List<LegalAct> legalActs = legalActService.getLegalActs();
        ApiResponse<List<LegalAct>> apiResponse = new ApiResponse<>(true, legalActs, "Legal Acts found successfully");
        return ResponseEntity.ok(apiResponse);

    }

}
