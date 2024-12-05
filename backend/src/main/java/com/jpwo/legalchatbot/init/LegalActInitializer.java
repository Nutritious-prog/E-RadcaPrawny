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
//        Tag educationTag = Tag.builder()
//                .name("EDUCATION")
//                .createdAt(new Date())
//                .build();
//        Tag criminalTag = Tag.builder()
//                .name("CRIMINAL")
//                .createdAt(new Date())
//                .build();
//        educationTag = tagRepository.save(educationTag);
//        criminalTag = tagRepository.save(criminalTag);
//        //LEGAL ACTS
//        LegalAct educationLegalAct = LegalAct.builder()
//                .title("Ustawa o Systemie Oświaty")
//                .textContent("Jest to Ustawa o Systemie Oświaty. Reguluje zasady funkcjonowania systemu edukacji w Polsce. Zapewnia równy dostęp do edukacji dla wszystkich obywateli, niezależnie od ich statusu społecznego czy materialnego. Ustawa określa role i obowiązki nauczycieli, uczniów oraz placówek oświatowych, a także zasady finansowania i nadzoru nad systemem edukacji.")
//                .createdAt(new Date())
//                .build();
//
//        LegalAct educationLegalActTwo = LegalAct.builder()
//                .title("Druga Ustawa o Systemie Oświaty")
//                .textContent("Jest to Druga Ustawa o Systemie Oświaty. Reguluje ona prawa i obowiązki ucznia, pokazuje jak powinien uczeń pracować oraz żyć w szkole.")
//                .createdAt(new Date())
//                .build();
//
//        LegalAct environmentalProtectionAct = LegalAct.builder()
//                .title("Ustawa o Ochronie Środowiska")
//                .textContent("Jest to Ustawa o Ochronie Środowiska. Koncentruje się na ochronie naturalnego środowiska Polski. Ustawa ustanawia wytyczne dotyczące kontroli zanieczyszczeń, ochrony zasobów naturalnych oraz promowania zrównoważonego rozwoju. Określa obowiązki przedsiębiorstw i obywateli w zakresie dbałości o środowisko oraz sankcje za ich naruszenie.")
//                .createdAt(new Date())
//                .build();
//
//        LegalAct laborCodeAct = LegalAct.builder()
//                .title("Kodeks Pracy")
//                .textContent("Jest to Kodeks Pracy. Reguluje prawa i obowiązki pracowników oraz pracodawców. Ustawa obejmuje kwestie związane z nawiązywaniem i rozwiązywaniem stosunku pracy, czasem pracy, wynagrodzeniem, urlopami oraz bezpieczeństwem i higieną pracy. Ma na celu zapewnienie ochrony praw pracowników oraz stabilności stosunków pracy.")
//                .createdAt(new Date())
//                .build();
//
//        LegalAct criminalCodeAct = LegalAct.builder()
//                .title("Kodeks Karny")
//                .textContent("Jest to Kodeks Karny. Definiuje czyny zabronione pod groźbą kary oraz określa sankcje karne za ich popełnienie. Ustawa zawiera przepisy ogólne dotyczące odpowiedzialności karnej, a także szczegółowe opisy przestępstw przeciwko życiu, zdrowiu, mieniu i innym dobrom chronionym prawem. Zapewnia ochronę porządku publicznego i bezpieczeństwa obywateli.")
//                .createdAt(new Date())
//                .build();
//
//        LegalAct civilCodeAct = LegalAct.builder()
//                .title("Kodeks Cywilny")
//                .textContent("Jest to Kodeks Cywilny. Reguluje stosunki cywilnoprawne między osobami fizycznymi i prawnymi. Ustawa obejmuje przepisy dotyczące własności i innych praw rzeczowych, zobowiązań, spadków oraz prawa rodzinnego. Stanowi podstawę dla umów cywilnoprawnych, określając zasady ich zawierania, wykonywania i rozwiązywania.")
//                .createdAt(new Date())
//                .build();
//        educationLegalAct = legalActRepository.save(educationLegalAct);
//        environmentalProtectionAct = legalActRepository.save(environmentalProtectionAct);
//        laborCodeAct = legalActRepository.save(laborCodeAct);
//        criminalCodeAct = legalActRepository.save(criminalCodeAct);
//        civilCodeAct = legalActRepository.save(civilCodeAct);
//        educationLegalActTwo = legalActRepository.save(educationLegalActTwo);
//        LegalActTag educationLegalActTag = new LegalActTag(educationLegalAct, educationTag, new Date());
//        LegalActTag criminalLegalActTag = new LegalActTag(criminalCodeAct, criminalTag, new Date());
//        legalActTagRepository.save(educationLegalActTag);
//        legalActTagRepository.save(criminalLegalActTag);
//
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
//        if (legalActRepository.count() == 0) {
            populateDatabaseFromExtractedTextFiles();
//        }
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
