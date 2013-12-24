package datastoreEntities;


import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.datastore.Key;

@PersistenceCapable
public class GameScore {
	@PrimaryKey
	@Persistent
	private Key key;
	
	@Persistent
	public Player player;
	
	@Persistent
	public Map map;
	
	@Persistent
	public int score;

}
