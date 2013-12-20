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
	
// ------------------------  average tests  -----------------------------------------------------------
	
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
	
	@Test
	public void AverageOneValArray()
	{
		assertEquals(1.0, j_statistics.average(new double[]{1.0}),0);
	}
	
	@Test
	public void AverageOneValVector()
	{
		Vector<Double> vec = new Vector<Double>();
		vec.add(1.0);
		assertEquals(1.0, j_statistics.average(vec),0);
	}
	
	@Test
	public void AverageMultipleValArray()
	{
		assertEquals(2.0, j_statistics.average(new double[]{1.0,2.0,3.0}),0);
	}
	
	@Test
	public void AverageMultipleValVector()
	{
		Vector<Double> vec = new Vector<Double>();
		vec.add(1.0);
		vec.add(2.0);
		vec.add(3.0);
		assertEquals(2.0, j_statistics.average(vec),0);
	}
	
// ------------------------  average tests  -----------------------------------------------------------
	
// ------------------------  variance tests  ----------------------------------------------------------
	
		@Test
		public void VarianceEmptyArray()
		{
			assertEquals(0, j_statistics.variance(new double[]{}),0);
		}
		
		@Test
		public void VarianceEmptyVector()
		{
			assertEquals(0, j_statistics.variance(new Vector<Double>()),0);
		}
		
		@Test
		public void VarianceOneValArray()
		{
			assertEquals(0.0, j_statistics.variance(new double[]{1.0}),0);
		}
		
		@Test
		public void VarianceOneValVector()
		{
			Vector<Double> vec = new Vector<Double>();
			vec.add(1.0);
			assertEquals(0.0, j_statistics.variance(vec),0);
		}
		
		@Test
		public void VarianceMultipleValArray()
		{
			assertEquals(2.0, j_statistics.variance(new double[]{1.0,2.0,3.0,4.0,5.0}),0);
		}
		
		@Test
		public void VarianceMultipleValVector()
		{
			Vector<Double> vec = new Vector<Double>();
			vec.add(1.0);
			vec.add(2.0);
			vec.add(3.0);
			vec.add(4.0);
			vec.add(5.0);
			assertEquals(2.0, j_statistics.variance(vec),0);
		}
		
// ------------------------  variance tests  ----------------------------------------------------------
		
// ------------------------  standard deviation & standard error tests  -------------------------------
		
		@Test
		public void StandardDeviationEmptyArray()
		{
			assertEquals(0, j_statistics.Standard_deviation(new double[]{}),0);
		}
		
		@Test
		public void StandardDeviationEmptyVector()
		{
			assertEquals(0, j_statistics.Standard_deviation(new Vector<Double>()),0);
		}
		
		@Test
		public void StandardDeviationOneValArray()
		{
			assertEquals(0, j_statistics.Standard_deviation(new double[]{1.0}),0);
		}
		
		@Test
		public void StandardDeviationOneValVector()
		{
			Vector<Double> vec = new Vector<Double>();
			vec.add(1.0);
			assertEquals(0, j_statistics.Standard_deviation(vec),0);
		}
		
		@Test
		public void StandardDeviationMultipleValArray()
		{
			assertEquals(Math.sqrt(2), j_statistics.Standard_deviation(new double[]{1.0,2.0,3.0,4.0,5.0}),0);
		}
		
		@Test
		public void StandardDeviationMultipleValVector()
		{
			Vector<Double> vec = new Vector<Double>();
			vec.add(1.0);
			vec.add(2.0);
			vec.add(3.0);
			vec.add(4.0);
			vec.add(5.0);
			assertEquals(Math.sqrt(2), j_statistics.Standard_deviation(vec),0);
		}
		
		@Test
		public void StandardErrorEmptyArray()
		{
			assertEquals(0, j_statistics.Standard_error(new double[]{}),0);
		}
		
		@Test
		public void StandardErrorEmptyVector()
		{
			assertEquals(0, j_statistics.Standard_error(new Vector<Double>()),0);
		}
		
		@Test
		public void StandardErrorOneValArray()
		{
			assertEquals(0, j_statistics.Standard_error(new double[]{1.0}),0);
		}
		
		@Test
		public void StandardErrorOneValVector()
		{
			Vector<Double> vec = new Vector<Double>();
			vec.add(1.0);
			assertEquals(0, j_statistics.Standard_error(vec),0);
		}
		
		@Test
		public void StandardErrorMultipleValArray()
		{
			assertEquals((Math.sqrt(2)/Math.sqrt(5)), j_statistics.Standard_error(new double[]{1.0,2.0,3.0,4.0,5.0}),0);
		}
		
		@Test
		public void StandardErrorMultipleValVector()
		{
			Vector<Double> vec = new Vector<Double>();
			vec.add(1.0);
			vec.add(2.0);
			vec.add(3.0);
			vec.add(4.0);
			vec.add(5.0);
			assertEquals((Math.sqrt(2)/Math.sqrt(5)), j_statistics.Standard_error(vec),0);
		}
		
// ------------------------  standard deviation & standard error tests  --------------------------------
}
