package tpjad2.postgres.repos;

import org.springframework.stereotype.Repository;
import tpjad2.postgres.models.User;
import tpjad2.utils.JpaRepositoryExtensions;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepositoryExtensions<User, Long> {
    Optional<User> findFirstByName(String userName);
}

