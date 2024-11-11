package com.jpwo.legalchatbot.controller;

import com.jpwo.legalchatbot.exception.DbObjectNotFoundException;
import com.jpwo.legalchatbot.model.ApiResponse;
import com.jpwo.legalchatbot.model.LegalAct;
import com.jpwo.legalchatbot.model.dto.LegalActContentDTO;
import com.jpwo.legalchatbot.model.dto.TagDTO;
import com.jpwo.legalchatbot.service.LegalActService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

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


    @PostMapping(value = "/{id}/tags")
    public ResponseEntity<ApiResponse<LegalAct>> addTagToLegalAct(@PathVariable("id") Long id, @RequestBody TagDTO tag) throws DbObjectNotFoundException {

        LegalAct updatedLegalAct = legalActService.addTagToLegalAct(id, tag);
        ApiResponse<LegalAct> apiResponse = new ApiResponse<>(true, updatedLegalAct, String.format("Tag: %s added to Legal Act successfully", tag.getName()));

        return ResponseEntity.ok(apiResponse);

    }

    @PostMapping(value = "/{id}/tags/multiple")
    public ResponseEntity<ApiResponse<LegalAct>> addMultipleTagsToLegalAct(@PathVariable("id") Long id, @RequestBody List<TagDTO> tags) throws DbObjectNotFoundException {
        LegalAct updatedLegalAct = legalActService.addMultipleTagsToLegalAct(id, tags);
        ApiResponse<LegalAct> apiResponse = new ApiResponse<>(true, updatedLegalAct, String.format("All %d tags added to Legal Act successfully", tags.size()));
        return ResponseEntity.ok(apiResponse);
    }


    @DeleteMapping(value = "/{id}/tags")
    public ResponseEntity<ApiResponse<LegalAct>> removeTagFromLegalAct(@PathVariable("id") Long id, @RequestBody TagDTO tag) throws DbObjectNotFoundException {

        LegalAct updatedLegalAct = legalActService.removeTagFromLegalAct(id, tag.getName());
        ApiResponse<LegalAct> apiResponse = new ApiResponse<>(true, updatedLegalAct, "Tag removed from Legal Act successfully");

        return ResponseEntity.ok(apiResponse);

    }

    @DeleteMapping(value = "/{id}/tags/multiple")
    public ResponseEntity<ApiResponse<LegalAct>> removeMultipleTagsFromLegalAct(@PathVariable("id") Long id, @RequestBody List<TagDTO> tags) throws DbObjectNotFoundException {

        LegalAct updatedLegalAct = legalActService.removeMultipleTagsFromLegalAct(id, tags);
        ApiResponse<LegalAct> apiResponse = new ApiResponse<>(true, updatedLegalAct,  String.format("All %d tags removed from Legal Act successfully", tags.size()));

        return ResponseEntity.ok(apiResponse);

    }

    @PutMapping(value = "/{id}/content")
    public ResponseEntity<ApiResponse<LegalAct>> updateLegalActContent(@PathVariable("id") Long id, @RequestBody LegalActContentDTO legalActContentDTO) throws DbObjectNotFoundException {
        LegalAct toUpdate = legalActService.getLegalAct(id).orElseThrow(() -> new DbObjectNotFoundException("Legal act not found"));

        toUpdate.setTextContent(legalActContentDTO.getContent());
        toUpdate.setModifiedAt(new Date());
        toUpdate = legalActService.saveLegalAct(toUpdate);
        ApiResponse<LegalAct> apiResponse = new ApiResponse<>(true, toUpdate, "Legal act content updated successfully");

        return ResponseEntity.ok(apiResponse);


    }



    // full admin update
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping(value = "/{id}")
    public ResponseEntity<ApiResponse<LegalAct>> updateLegalAct(@PathVariable("id") Long id, @RequestBody LegalAct legalAct) throws DbObjectNotFoundException {

        LegalAct toUpdate = legalActService.getLegalAct(id).orElseThrow(() -> new DbObjectNotFoundException("Legal act not found"));
        toUpdate.updateTo(legalAct);
        toUpdate = legalActService.saveLegalAct(toUpdate);
        ApiResponse<LegalAct> apiResponse = new ApiResponse<>(true, toUpdate, "Legal act updated successfully");
        return ResponseEntity.ok(apiResponse);


    }


}
