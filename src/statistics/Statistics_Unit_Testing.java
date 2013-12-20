package statistics;

import static org.junit.Assert.*;
import java.util.Vector;
import org.junit.Test;
import org.junit.Before;

public class Statistics_Unit_Testing {

	private static final int NUMBER_OF_DOUBLES = 100;
	
	private Statistics j_statistics;
	
	private Vector<Double> vec;
	private double[] arr;
	
	@Before
	public void initialize()
	{
		j_statistics = new Statistics();
		vec = new Vector<Double>();
		arr = new double[NUMBER_OF_DOUBLES];
	}
	
	@Test
	public void EmptyVectorToArray()
	{
		assertTrue(j_statistics.vector_to_array(vec) instanceof double[]);
	}
	
	@Test
	public void EmptyArrayToVector()
	{
		assertTrue(j_statistics.array_to_vector(arr).getClass().equals(vec.getClass()));
	}
	
}
