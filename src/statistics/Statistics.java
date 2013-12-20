package statistics;

import java.util.Vector;

/**
* This class implements some simple statistical functions on arrays of numbers,
* namely, the average, variance, standard deviation, covariance, min and max.
*/

public class Statistics
{

	/**
	* Converts a vector of Numbers into an array of double. 
	*/	
	public double[] vector_to_array(Vector<Double> v) 
	{
		double[] d = new double[v.size()];
		int i = 0;
		for (Double val : v)
		{
			d[i] = val;
			i++;
		}
		return d;
	}
	
	/**
	* Converts a array of double into  a  vector of Numbers. 
	*/	
	public Vector<Double> array_to_vector(double[] d)
	{
		Vector<Double> vec = new Vector<Double>();
		for (int i = 0; i<d.length ; i ++ )
			vec.addElement(d[i]);
		return vec;
	}
	
	
	/**
	* Calculates the square of a double.
	* 
	* @param x
	* @return Returns x*x
	*/
	
	private static double square(double x) 
	{
		return x * x;
	}
	
	/**
	* Returns the average of an array of double.
	*/
	
	public double average(double[] d) 
	{
		if(d.length == 0.0)
			return 0.0;
		
		double tot = 0.0;
		for (int i = 0; i < d.length; i++)
			tot += d[i];
		return tot / d.length;
	}
	
	/**
	* Returns the average of an vector of double.
	*/
	
	public double average(Vector<Double> v) 
	{
		if(v.isEmpty())
			return 0.0;
		
		double tot = 0.0;
		for (Double d : v)
			tot += d;
		return tot / v.size();
	}
}