package datastoreEntities;

import java.util.List;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
import com.google.appengine.api.datastore.Key;


@PersistenceCapable
public class Node {
	
	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Key key;

    @Persistent
    private double x;
    
    @Persistent
    private double y;
	
	@Persistent
    private List<Node> edges;

	public Node(Key key, double x, double y, List<Node> edges) {
		this.key = key;
		this.x = x;
		this.y = y;
		this.edges = edges;
	}

	public Key getKey() {
		return key;
	}

	public void setKey(Key key) {
		this.key = key;
	}

	public double getX() {
		return x;
	}

	public void setX(double x) {
		this.x = x;
	}

	public double getY() {
		return y;
	}

	public void setY(double y) {
		this.y = y;
	}

	public List<Node> getEdges() {
		return edges;
	}

	public void setEdges(List<Node> edges) {
		this.edges = edges;
	}
}
