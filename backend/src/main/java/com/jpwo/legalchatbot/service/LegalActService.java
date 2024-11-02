package com.jpwo.legalchatbot.service;


import com.jpwo.legalchatbot.model.LegalAct;
import com.jpwo.legalchatbot.repository.LegalActRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LegalActService {


    final LegalActRepository legalActRepository;

    @Autowired
    public LegalActService(final LegalActRepository legalActRepository) {
        this.legalActRepository = legalActRepository;
    }

    public List<LegalAct> getLegalActs() {
        return legalActRepository.findAll();
    }

}
