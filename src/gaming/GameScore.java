package gaming;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@PersistenceCapable
public class GameScore {
    @Id                                             // Map this to the primary key column.
    @GeneratedValue(strategy = GenerationType.AUTO) // Database will generate new primary keys, not us.
    private Integer id;
	@Persistent
	public String name;
	@Persistent
	public String pic;
	@Persistent
	public int score;

}
