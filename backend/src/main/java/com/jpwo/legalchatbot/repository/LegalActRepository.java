package com.jpwo.legalchatbot.repository;

import com.jpwo.legalchatbot.model.LegalAct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LegalActRepository extends JpaRepository<LegalAct, Long> {
}
