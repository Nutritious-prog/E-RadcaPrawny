package com.jpwo.legalchatbot.init;

import com.jpwo.legalchatbot.model.LegalAct;
import com.jpwo.legalchatbot.model.LegalActTag;
import com.jpwo.legalchatbot.model.Tag;
import com.jpwo.legalchatbot.model.security.SystemRole;
import com.jpwo.legalchatbot.model.security.User;
import com.jpwo.legalchatbot.repository.LegalActRepository;
import com.jpwo.legalchatbot.repository.LegalActTagRepository;
import com.jpwo.legalchatbot.repository.TagRepository;
import com.jpwo.legalchatbot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Date;

@Component
public class LegalActInitializer implements CommandLineRunner {

    private final LegalActRepository legalActRepository;
    private final TagRepository tagRepository;
    private final LegalActTagRepository legalActTagRepository;
    private final PasswordEncoder passwordEncoder;

    private static final String TEXT_FILES_PATH = "D:\\E-RadcaPrawny\\scraper\\extracted_txt";
    private final UserRepository userRepository;

    @Autowired
    public LegalActInitializer(LegalActRepository legalActRepository, TagRepository tagRepository, LegalActTagRepository legalActTagRepository,
                               PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.legalActRepository = legalActRepository;
        this.tagRepository = tagRepository;
        this.legalActTagRepository = legalActTagRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        // todo remove this code when starting data is no longer required and scraper is fully integrated
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
        LegalActTag educationLegalActTag = new LegalActTag(educationLegalAct, educationTag, new Date());
        LegalActTag criminalLegalActTag = new LegalActTag(criminalLegalAct, criminalTag, new Date());
        legalActTagRepository.save(educationLegalActTag);
        legalActTagRepository.save(criminalLegalActTag);

        // TEST USERS
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setEmail("admin@test.com");
            admin.setPassword(passwordEncoder.encode("12345678"));
            admin.setRole(SystemRole.ROLE_ADMIN);

            User editor = new User();
            editor.setEmail("editor@test.com");
            editor.setPassword(passwordEncoder.encode("12345678"));
            editor.setRole(SystemRole.ROLE_EDITOR);

            userRepository.save(admin);
            userRepository.save(editor);
        }



        // todo keep only this code when scraper integration is fully finished
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
