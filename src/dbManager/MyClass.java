package dbManager;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable
public class MyClass {
	@PrimaryKey
	public String key;
	@Persistent
	public String TheField;
	}
