package statistics;

import static org.junit.Assert.*;

import java.util.Vector;

import org.junit.Test;
import org.junit.Before;

public class Statistics_Unit_Testing {
	
	private Statistics j_statistics;
	
	@Before
	public void initialize()
	{
		j_statistics = new Statistics();
	}

// ------------------------  array_to_vector & vector_to_array tests  ---------------------------------

	
	@Test
	public void EmptyVectorToArray()
	{
		assertTrue(j_statistics.vector_to_array(new Vector<Double>()) instanceof double[]);
	}
	
	@Test
	public void EmptyArrayToVector()
	{
		Vector<Double> vec = new Vector<Double>();
		assertTrue(j_statistics.array_to_vector(new double[]{}).getClass().equals(vec.getClass()));
	}
	
	@Test
	public void OneVal_VectorToArray()
	{
		Vector<Double> vec = new Vector<Double>();
		vec.add(1.0);
		assertArrayEquals(new double[]{1.0} , j_statistics.vector_to_array(vec), 0);
	}
	
	@Test
	public void OneVal_ArrayToVector()
	{
		Vector<Double> vec = new Vector<Double>();
		vec.add(1.0);
		assertTrue(vec.equals(j_statistics.array_to_vector(new double[]{1.0})));
	}
	
	@Test
	public void MultipleVal_VectorToArray()
	{
		Vector<Double> vec = new Vector<Double>();
		vec.add(1.0);
		vec.add(2.0);
		vec.add(3.0);
		assertArrayEquals(new double[] {1.0 , 2.0 , 3.0 }, j_statistics.vector_to_array(vec), 0);
	}
	
	@Test
	public void MultipleVal_ArrayToVector()
	{
		Vector<Double> vec = new Vector<Double>();
		vec.add(1.0);
		vec.add(2.0);
		vec.add(3.0);
		assertTrue(vec.equals(j_statistics.array_to_vector(new double[] {1.0 , 2.0 , 3.0 })));
	}
	
	
// ------------------------  array_to_vector & vector_to_array tests  ---------------------------------
	
	@Test
	public void AverageEmptyArray()
	{
		assertEquals(0, j_statistics.average(new double[]{}),0);
	}
	
	@Test
	public void AverageEmptyVector()
	{
		assertEquals(0, j_statistics.average(new Vector<Double>()),0);
	}
	
}
