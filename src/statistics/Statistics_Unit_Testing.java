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
	public void OneValVectorToArray()
	{
		Vector<Double> vec = new Vector<Double>();
		vec.add(1.0);
		assertArrayEquals(new double[]{1.0} , j_statistics.vector_to_array(vec), 0);
	}
	
	@Test
	public void OneValArrayToVector()
	{
		Vector<Double> vec = new Vector<Double>();
		vec.add(1.0);
		assertTrue(vec.equals(j_statistics.array_to_vector(new double[]{1.0})));
	}
	
	@Test
	public void MultipleValVectorToArray()
	{
		Vector<Double> vec = new Vector<Double>();
		vec.add(1.0);
		vec.add(2.0);
		vec.add(3.0);
		assertArrayEquals(new double[] {1.0 , 2.0 , 3.0 }, j_statistics.vector_to_array(vec), 0);
	}
	
	@Test
	public void MultipleValArrayToVector()
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
		
// ------------------------  standard deviation & standard error tests  -------------------------------
		
// ------------------------  covariance & correlation tests  ------------------------------------------
		
		@Test
		public void CoVarianceEmptyArrays()
		{
			assertEquals(0, j_statistics.co_variance(new double[]{},new double[]{}),0);
		}
				
		@Test
		public void CoVarianceEmptyVectors()
		{
			assertEquals(0, j_statistics.co_variance(new Vector<Double>(),new Vector<Double>()),0);
		}
		
		@Test
		public void CoVarianceOneValArrays()
		{
			assertEquals(0, j_statistics.co_variance(new double[]{1.0},new double[]{1.0}),0);
		}
		
		@Test
		public void CoVarianceOneValVectors()
		{
			Vector<Double> vec1 = new Vector<Double>();
			vec1.add(1.0);
			Vector<Double> vec2 = new Vector<Double>();
			vec2.add(1.0);
			assertEquals(0, j_statistics.co_variance(vec1,vec2),0);
		}
		
		@Test
		public void CoVarianceMultipleValArrays()
		{
			assertEquals(2, j_statistics.co_variance(new double[]{1.0,2.0,3.0,4.0,5.0},new double[]{1.0,2.0,3.0,4.0,5.0}),0);
		}
		
		@Test
		public void CoVarianceMultipleValVectors()
		{
			Vector<Double> vec1 = new Vector<Double>();
			Vector<Double> vec2 = new Vector<Double>();
			vec1.add(1.0);	vec2.add(1.0);
			vec1.add(2.0);	vec2.add(2.0);
			vec1.add(3.0);	vec2.add(3.0);
			vec1.add(4.0);	vec2.add(4.0);
			vec1.add(5.0);	vec2.add(5.0);
			assertEquals(2, j_statistics.co_variance(vec1,vec2),0);
		}
		
		@Test
		public void CorrelationEmptyArray()
		{
					assertEquals(0, j_statistics.correlation(new double[]{},new double[]{}),0);
		}
		
		@Test
		public void CorrelationEmptyVector()
		{
			assertEquals(0, j_statistics.correlation(new Vector<Double>(),new Vector<Double>()),0);
		}
		
		@Test
		public void CorrelationOneValArray()
		{
			assertEquals(0, j_statistics.correlation(new double[]{1.0},new double[]{1.0}),0);
		}
		
		@Test
		public void CorrelationOneValVector()
		{
			Vector<Double> vec1 = new Vector<Double>();
			vec1.add(1.0);
			Vector<Double> vec2 = new Vector<Double>();
			vec2.add(1.0);
			assertEquals(0, j_statistics.correlation(vec1,vec2),0);
		}
		
		@Test
		public void CorrelationMultipleValArray()
		{
			assertEquals((2/( Math.sqrt(2)*Math.sqrt(2) )), j_statistics.correlation(new double[]{1.0,2.0,3.0,4.0,5.0},new double[]{1.0,2.0,3.0,4.0,5.0}),0);
		}
		
		@Test
		public void CorrelationMultipleValVector()
		{
			Vector<Double> vec1 = new Vector<Double>();
			Vector<Double> vec2 = new Vector<Double>();
			vec1.add(1.0);	vec2.add(1.0);
			vec1.add(2.0);	vec2.add(2.0);
			vec1.add(3.0);	vec2.add(3.0);
			vec1.add(4.0);	vec2.add(4.0);
			vec1.add(5.0);	vec2.add(5.0);
			assertEquals((2/( Math.sqrt(2)*Math.sqrt(2) )), j_statistics.correlation(vec1,vec2),0);
		}
		
// ------------------------  covariance & correlation tests  ------------------------------------------
		
// ------------------------  max & min tests  ---------------------------------------------------------
		
		@Test
		public void MaxEmptyArray()
		{
			assertEquals(0, j_statistics.max(new double[]{}),0);
		}
		
		@Test
		public void MinEmptyArray()
		{
			assertEquals(0, j_statistics.min(new double[]{}),0);
		}
		
		@Test
		public void MaxEmptyVector()
		{
			assertEquals(0, j_statistics.max(new Vector<Double>()),0);
		}
		
		@Test
		public void MinEmptyVector()
		{
			assertEquals(0, j_statistics.min(new Vector<Double>()),0);
		}
		
		@Test
		public void MaxOneValArray()
		{
			assertEquals(1.0, j_statistics.max(new double[]{1.0}),0);
		}
		
		@Test
		public void MinOneValArray()
		{
			assertEquals(1.0, j_statistics.min(new double[]{1.0}),0);
		}
		
		@Test
		public void MaxOneValVector()
		{
			Vector<Double> vec = new Vector<Double>();
			vec.add(1.0);
			assertEquals(1.0, j_statistics.max(vec),0);
		}
		
		@Test
		public void MinOneValVector()
		{
			Vector<Double> vec = new Vector<Double>();
			vec.add(1.0);
			assertEquals(1.0, j_statistics.min(vec),0);
		}
		
		@Test
		public void MaxMultipleValArray()
		{
			assertEquals(3.0, j_statistics.max(new double[]{1.0,2.0,3.0}),0);
		}
		
		@Test
		public void MinMultipleValArray()
		{
			assertEquals(1.0, j_statistics.min(new double[]{1.0,2.0,3.0}),0);
		}
		
		@Test
		public void MaxMultipleValVector()
		{
			Vector<Double> vec = new Vector<Double>();
			vec.add(1.0);
			vec.add(2.0);
			vec.add(3.0);
			assertEquals(3.0, j_statistics.max(vec),0);
		}
		
		@Test
		public void MinMultipleValVector()
		{
			Vector<Double> vec = new Vector<Double>();
			vec.add(1.0);
			vec.add(2.0);
			vec.add(3.0);
			assertEquals(1.0, j_statistics.min(vec),0);
		}
		
// ------------------------  max & min tests  ---------------------------------------------------------
}
