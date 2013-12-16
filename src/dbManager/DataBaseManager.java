package dbManager;
import java.util.List;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;

import datastoreEntities.GameScore;
import datastoreEntities.Player;
public final class DataBaseManager
 {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PersistenceManager pm = PMF.get().getPersistenceManager();
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
    	pm.makePersistent(s);
    }
    @SuppressWarnings("unchecked")
	public List<GameScore> getScoreForPlayer(String name)
    {
    	System.out.println("getting scores for player " + name);
    	javax.jdo.Query q = pm.newQuery(GameScore.class);
    	q.setFilter("name==theName");
    	q.declareParameters("String theName");
    	return (List<GameScore>)q.execute(name);
    }
    @SuppressWarnings("unchecked")
	public List<GameScore> getAllScores()
    {
    	javax.jdo.Query q = pm.newQuery(GameScore.class);
    	return (List<GameScore>)q.execute();
    }


	public void insertNewPlayer(Player player) {
		pm.makePersistent(player);
		
	}


	public boolean findElementById(Object oid) {
		
		try {
			pm.getObjectById(Player.class, oid);
	
		} catch (JDOObjectNotFoundException  e) {
			//New User
			return false;
		}
		return true;
	}

}
