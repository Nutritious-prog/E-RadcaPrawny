package com.jpwo.legalchatbot.init;

import com.jpwo.legalchatbot.model.LegalAct;
import com.jpwo.legalchatbot.model.LegalActTag;
import com.jpwo.legalchatbot.model.Tag;
import com.jpwo.legalchatbot.repository.LegalActRepository;
import com.jpwo.legalchatbot.repository.LegalActTagRepository;
import com.jpwo.legalchatbot.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class LegalActInitializer implements CommandLineRunner {

    private final LegalActRepository legalActRepository;
    private final TagRepository tagRepository;
    private final LegalActTagRepository legalActTagRepository;

    @Autowired
    public LegalActInitializer(LegalActRepository legalActRepository, TagRepository tagRepository, LegalActTagRepository legalActTagRepository) {
        this.legalActRepository = legalActRepository;
        this.tagRepository = tagRepository;
        this.legalActTagRepository = legalActTagRepository;
    }


    /* TODO Here python script will be launched, which scrapes the data and stores LegalAct objects (with textContent) in db.
        the scraping should take place if the legal_acts table is in an empty state.
        When the table is already populated with data, there is no need to run the full script again.
    */
    @Override
    public void run(String... args) throws Exception {

        //TAGS
        Tag educationTag = Tag.builder()
                .name("EDUCATION")
                .createdAt(new Date())
                .build();
        Tag criminalTag = Tag.builder()
                .name("CRIMINAL")
                .createdAt(new Date())
                .build();

        educationTag = tagRepository.save(educationTag);
        criminalTag = tagRepository.save(criminalTag);

        //LEGAL ACTS
        LegalAct educationLegalAct = LegalAct.builder()
                .title("EDUCATION LEGAL ACT")
                .textContent("LEGAL ACT CONTENT....")
                .createdAt(new Date())
                .build();

        LegalAct criminalLegalAct = LegalAct.builder()
                .title("CRIMINAL LEGAL ACT")
                .textContent("CRIMINAL ACT CONTENT....")
                .createdAt(new Date())
                .build();

        educationLegalAct = legalActRepository.save(educationLegalAct);
        criminalLegalAct = legalActRepository.save(criminalLegalAct);

        //LEGAL ACT TAGS
        LegalActTag educationLegalActTag = new LegalActTag(educationLegalAct, educationTag, new Date());
        LegalActTag criminalLegalActTag = new LegalActTag(criminalLegalAct, criminalTag, new Date());
        legalActTagRepository.save(educationLegalActTag);
        legalActTagRepository.save(criminalLegalActTag);

    }
}
