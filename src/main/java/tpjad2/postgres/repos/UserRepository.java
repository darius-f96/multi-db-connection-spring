package tpjad2.postgres.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tpjad2.postgres.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}

