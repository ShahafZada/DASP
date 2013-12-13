package datastoreEntities;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.datastore.Key;

@PersistenceCapable
public class GameScore {
	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Key key;
	@Persistent
	public String name;
	@Persistent
	public String pic;
	@Persistent
	public int score;
	
//	@Persistent
//	public Player player;
	
//	@Persistent
//	public Map map;

}
