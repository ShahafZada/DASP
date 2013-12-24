package Manager;

import javax.jdo.PersistenceManager;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;

public final class Manager {
	static DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
	static PersistenceManager pm = PMF.get().getPersistenceManager();
	
	public static PersistenceManager getPM() {
		return pm;
	}
}

