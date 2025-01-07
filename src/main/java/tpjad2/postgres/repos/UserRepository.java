package tpjad2.postgres.repos;

import org.springframework.stereotype.Repository;
import tpjad2.postgres.models.User;
import tpjad2.utils.JpaRepositoryExtensions;

@Repository
public interface UserRepository extends JpaRepositoryExtensions<User, Long> {
}

