package com.jpwo.legalchatbot.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.jpwo.legalchatbot.exception.DbObjectNotFoundException;
import com.jpwo.legalchatbot.model.ApiResponse;
import com.jpwo.legalchatbot.model.LegalAct;
import com.jpwo.legalchatbot.model.dto.LegalActContentDTO;
import com.jpwo.legalchatbot.service.LegalActService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class LegalActControllerTest {

    @Mock
    private LegalActService legalActService;

    @InjectMocks
    private LegalActController legalActController;

    @BeforeEach
    void setUp() {
        reset(legalActService);
    }

    @Test
    void updateLegalActContent_ShouldUpdateContentAndReturnUpdatedLegalAct() throws DbObjectNotFoundException {
        // given
        Long legalActId = 1L;
        LegalActContentDTO legalActContentDTO = new LegalActContentDTO("content");

        LegalAct existingLegalAct = new LegalAct();
        existingLegalAct.setId(legalActId);
        existingLegalAct.setTextContent("mew content");
        Date originalModifiedAt = new Date();
        existingLegalAct.setModifiedAt(originalModifiedAt);

        // when
        when(legalActService.getLegalAct(legalActId)).thenReturn(Optional.of(existingLegalAct));
        when(legalActService.saveLegalAct(existingLegalAct)).thenReturn(existingLegalAct);

        // then
        ResponseEntity<ApiResponse<LegalAct>> response = legalActController.updateLegalActContent(legalActId, legalActContentDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertEquals("content", response.getBody().getResponse().getTextContent());
        assertEquals("Legal act content updated successfully", response.getBody().getMessage());

        ArgumentCaptor<LegalAct> legalActCaptor = ArgumentCaptor.forClass(LegalAct.class);
        verify(legalActService).saveLegalAct(legalActCaptor.capture());
        LegalAct savedLegalAct = legalActCaptor.getValue();

        assertNotNull(savedLegalAct.getModifiedAt());
        assertNotEquals(originalModifiedAt, savedLegalAct.getModifiedAt());
        assertTrue(savedLegalAct.getModifiedAt().after(originalModifiedAt));
    }

    @Test
    void updateLegalActContent_ShouldThrowDbObjectNotFoundException_WhenLegalActNotFound() {
        // given
        Long legalActId = 1L;
        LegalActContentDTO legalActContentDTO = new LegalActContentDTO("content");

        //when
        when(legalActService.getLegalAct(legalActId)).thenReturn(Optional.empty());

        // then
        DbObjectNotFoundException exception = assertThrows(DbObjectNotFoundException.class, () -> {
            legalActController.updateLegalActContent(legalActId, legalActContentDTO);
        });
        assertEquals("Legal act not found", exception.getMessage());
    }


    @Test
    void updateLegalActContent_ShouldReturnBadRequest_WhenContentDTOIsNull() throws DbObjectNotFoundException {
        // given
        Long legalActId = 1L;
        LegalActContentDTO legalActContentDTO = null;

        // when
        ResponseEntity<ApiResponse<LegalAct>> response = legalActController.updateLegalActContent(legalActId, legalActContentDTO);

        // then
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Content cannot be null", response.getBody().getMessage());
        assertEquals(false, response.getBody().isSuccess());
    }

    @Test
    void updateLegalActContent_ShouldReturnBadRequest_WhenContentIsNull() throws DbObjectNotFoundException {
        // given
        Long legalActId = 1L;
        LegalActContentDTO legalActContentDTO = new LegalActContentDTO(null);

        // when
        ResponseEntity<ApiResponse<LegalAct>> response = legalActController.updateLegalActContent(legalActId, legalActContentDTO);

        // then
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Content cannot be null", response.getBody().getMessage());
        assertEquals(false, response.getBody().isSuccess());
    }
}