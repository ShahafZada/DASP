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
	public  double[] vector_to_array(Vector<Double> v) 
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
	public  Vector<Double> array_to_vector(double[] d)
	{
		Vector<Double> vec = new Vector<Double>();
		for (int i = 0; i<d.length ; i ++ )
			vec.addElement(d[i]);
		return vec;
	}
}