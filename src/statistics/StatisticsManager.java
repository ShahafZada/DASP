package statistics;

import java.util.List;
import java.util.Vector;

import javax.jdo.JDOObjectNotFoundException;

import datastoreEntities.*;
import Manager.*;


public final class StatisticsManager
 { 
    private StatisticsManager() {}
    private static StatisticsManager instance = null;
    
    
    
    public static StatisticsManager getInstance()
    {
        if (instance == null)
            instance = new StatisticsManager();
        return instance;
    }
    
    @SuppressWarnings("unchecked")
	public Vector<Double> getScoreForMap(int MapNum)
    {
    	System.out.println("getting scores for Map " + MapNum);
    	javax.jdo.Query q = Manager.getPM().newQuery(GameScore.class);
    	q.setFilter("SELECT Player,score ");//"MapNum==MapNum");
    	q.declareParameters("int MapNum");
    	return (Vector<Double>)q.execute(MapNum);
    }
    @SuppressWarnings("unchecked")
	public List<GameScore> getAllScores()
    {
    	javax.jdo.Query q = Manager.getPM().newQuery(GameScore.class);
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

}
