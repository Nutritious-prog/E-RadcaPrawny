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

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Objects;

@Component
public class LegalActInitializer implements CommandLineRunner {

    private final LegalActRepository legalActRepository;
    private final TagRepository tagRepository;
    private final LegalActTagRepository legalActTagRepository;

    private static final String TEXT_FILES_PATH = "D:\\E-RadcaPrawny\\scraper\\extracted_txt";

    @Autowired
    public LegalActInitializer(LegalActRepository legalActRepository, TagRepository tagRepository, LegalActTagRepository legalActTagRepository) {
        this.legalActRepository = legalActRepository;
        this.tagRepository = tagRepository;
        this.legalActTagRepository = legalActTagRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (legalActRepository.count() == 0) {
            populateDatabaseFromExtractedTextFiles();
        }
    }

    private void populateDatabaseFromExtractedTextFiles() {
        File folder = new File(TEXT_FILES_PATH);
        File[] files = folder.listFiles((dir, name) -> name.endsWith(".txt"));

        if (files != null) {
            for (File file : files) {
                try {
                    String textContent = new String(Files.readAllBytes(Paths.get(file.getAbsolutePath())));
                    System.out.println("Content of " + file.getName() + ": " + textContent);
                    textContent = textContent.replaceAll("\\s+", " ").trim();
                    LegalAct legalAct = LegalAct.builder()
                            .title(file.getName().replace(".txt", ""))  // Use file name as title
                            .textContent(textContent)
                            .createdAt(new Date())
                            .build();

                    legalActRepository.save(legalAct);
                    System.out.println("Saved LegalAct for file: " + file.getName());
                } catch (IOException e) {
                    System.err.println("Failed to read file: " + file.getAbsolutePath());
                }
            }
        } else {
            System.err.println("No text files found in directory: " + TEXT_FILES_PATH);
        }
    }
}
