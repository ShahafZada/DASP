
package dbManager;

import java.util.List;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import datastoreEntities.GameScore;
import datastoreEntities.Player;
import Manager.*;

public final class DataBaseManager
{  
	private DataBaseManager() {}
	private static DataBaseManager instance = null;
	public static DataBaseManager getInstance()
	{
		if (instance == null)
			instance = new DataBaseManager();
		return instance;
	}


	public void insertNewScore(GameScore s)
	{
		Manager.getPM().makePersistent(s);
	}

	@SuppressWarnings("unchecked")
	public List<GameScore> getScoreForPlayer(String name)
	{
		System.out.println("getting scores for player " + name);
		Query q = Manager.getPM().newQuery(GameScore.class);
		q.setFilter("name==theName");
		q.declareParameters("String theName");
		return (List<GameScore>)q.execute(name);
	}
	@SuppressWarnings("unchecked")
	public List<GameScore> getAllScores()
	{
		Query q = Manager.getPM().newQuery(GameScore.class);
		return (List<GameScore>)q.execute();
	}


	public void insertNewPlayer(Player player) {
		Manager.getPM().makePersistent(player);

	}


	public boolean findElementById(Object oid) {

		try {
			Manager.getPM().getObjectById(Player.class, oid);

		} catch (JDOObjectNotFoundException  e) {
			//New User
			return false;
		}
		return true;
	}

	public Player findPlayer(Object email, Object password) {

		Player player = null;

		try {
			 player = Manager.getPM().getObjectById(Player.class, email);
		}
		catch (JDOObjectNotFoundException  e) {
			return null;  
		}
		if (player.authenticate((String)password)) {
			return player;
		}
		return null; //password not correct case
		 
	}


}

