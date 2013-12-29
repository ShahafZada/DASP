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
		if(d.length == 0)
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
	
	/**
	* Returns the variance of the array of double.
	*/
	public double variance(double[] d) 
	{
		if(d.length == 0)
			return 0.0;
		
		double mu = average(d);
		double sumsq = 0.0;
		for (int i = 0; i < d.length; i++)
			sumsq += square(mu - d[i]);
		return sumsq / (d.length);
	}
	
	/**
	* Returns the variance of the vector of double.
	*/
	public double variance(Vector<Double> v) 
	{
		if(v.isEmpty())
			return 0.0;
		
		double mu = average(v);
		double sumsq = 0.0;
		for (Double d : v)
			sumsq += square(mu - d);
		return sumsq / (v.size());
	}
	
	/**
	* Returns the sample standard deviation of an array of double.
	*/
	
	public double Standard_deviation(double[] d) 
	{
		return Math.sqrt(variance(d));
	}
	
	/**
	* Returns the sample standard deviation of an vector of double.
	*/
	
	public double Standard_deviation(Vector<Double> d) 
	{
		return Math.sqrt(variance(d));
	}
	
	/**
	* Returns the standard error of an array of double, where this is defined
	* as the standard deviation of the sample divided by the square root of the
	* sample size.
	*/
	
	public double Standard_error(double[] d)
	{
		if( d.length == 0)
			return 0;
		return Standard_deviation(d) / Math.sqrt(d.length);
	}
	
	/**
	* Returns the standard error of an vector of double, where this is defined
	* as the standard deviation of the sample divided by the square root of the
	* sample size.
	*/
	
	public double Standard_error(Vector<Double> v)
	{
		if(v.isEmpty())
			return 0;
		return Standard_deviation(v) / Math.sqrt(v.size());
	}
	
	/**
	* Returns the covariance of the paired arrays of double.
	*/
	
	public double co_variance(double[] d1, double[] d2) 
	{
		if(d1.length == 0 || d2.length == 0)
			return 0;
		
		double m1 = average(d1);
		double m2 = average(d2);
		double sumsq = 0.0;
		for (int i = 0; i < d1.length; i++)
			sumsq += (m1 - d1[i]) * (m2 - d2[i]);
		return sumsq / (d1.length);
	}
	
	/**
	* Returns the covariance of the paired vector of double.
	*/
	
	public double co_variance(Vector<Double> v1 , Vector<Double> v2) 
	{
		if(v1.isEmpty() || v2.isEmpty())
			return 0;
		
		double m1 = average(v1);
		double m2 = average(v2);
		double sumsq = 0.0;
		for (int i = 0; i < v1.size(); i++)
			sumsq += (m1 - v1.elementAt(i)) * (m2 - v2.elementAt(i));
		return sumsq / (v1.size());
	}
	
	public double correlation(double[] d1, double[] d2) 
	{
		if(d1.length == 0 || d2.length == 0)
			return 0;
		
		if(Standard_deviation(d1) == 0 || Standard_deviation(d2) == 0)
			return 0;
		
		return ( co_variance(d1, d2) / ( Standard_deviation(d1) * Standard_deviation(d2) ) );
	}
	
	public double correlation(Vector<Double> v1, Vector<Double> v2) 
	{
		if(v1.isEmpty() || v2.isEmpty())
		return 0;
		
		if(Standard_deviation(v1) == 0 || Standard_deviation(v2) == 0)
			return 0;
		
		return ( co_variance(v1, v2) / ( Standard_deviation(v1) * Standard_deviation(v2) ) );
	}
	
	/**
	* Returns the maximum value in the array.
	*/
	
	public double max(double[] d) 
	{
		if(d.length == 0)
			return 0;
		
		double m = d[0];
		for (int i = 1; i < d.length; i++)
			m = Math.max(m, d[i]);
		return m;
	}
	
	/**
	* Returns the minimum value in the array.
	*/
	
	public double min(double[] d) 
	{
		if(d.length == 0)
			return 0;
		
		double m = d[0];
		for (int i = 1; i < d.length; i++)
			m = Math.min(m, d[i]);
		return m;
	}
	
	/**
	* Returns the maximum value in the vector.
	*/
	public double max(Vector<Double> v) 
	{
		if(v.isEmpty())
			return 0;
		
		double m = ((Double)v.firstElement()).doubleValue();
		for (Double d : v) 
			m = Math.max(m, d);
		return m;
	}
	
	/**
	* Returns the minimum value in the vector.
	*/
	
	public double min(Vector<Double> v) 
	{
		if(v.isEmpty())
			return 0;
		
		double m = ((Double)v.firstElement()).doubleValue();
		for (Double d : v)
			m = Math.min(m, d);
		return m;
	}
	
	/**
	* Prints the averages and standard deviation of the data to the standard
	* output. array version
	*/
	
	public String analyze_one_array(double[] d) 
	{
	return(
				"Average = " + average(d) 
				+ "<br></br>   variance = " + variance(d) 
				+ "<br></br>   Standard deviation = " + Standard_deviation(d) 
				+ "<br></br>   Standard error = "+ Standard_error(d) +"<br></br>   min = "
				+ min(d) + "<br></br>   max = " + max(d)
				);
	}
	
	/**
	* Prints the averages and standard deviation of the data to the standard
	* output. vector varsion
	*/
	
	public String analyze_one_vector(Vector<Double> v) 
	{
		return(
				"Average = " + average(v) 
				+ "<br></br>   variance = " + variance(v) 
				+ "<br></br>   Standard deviation = " + Standard_deviation(v) 
				+ "<br></br>   Standard error = "+ Standard_error(v) +"<br></br>  min = "
				+ min(v) + "<br></br>   max = " + max(v)
				);
	}
	
	public String analyze_two_arrays(double[] d1,double[] d2) 
	{
		return(
				"Covariance = " + co_variance(d1,d2) 
				+ "<br></br>   correlation = " + correlation(d1,d2) 
				);
	}
	
	/**
	* Prints the averages and standard deviation of the data to the standard
	* output. vector varsion
	*/
	
	public String analyze_two_vectors(Vector<Double> v1,Vector<Double> v2) 
	{
		return(
				"Covariance = " + co_variance(v1,v2) 
				+ "<br></br>   correlation = " + correlation(v1,v2) 
				);
	}
}