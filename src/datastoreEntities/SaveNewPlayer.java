package datastoreEntities;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


//import javax.servlet.http.HttpSession;
import java.security.NoSuchAlgorithmException;



import datastoreEntities.Player;
import dbManager.DataBaseManager;

/**
 * Servlet implementation class SaveNewUser
 */
public class SaveNewPlayer extends HttpServlet {
	private static final long serialVersionUID = 1L;
        /**
     * @see HttpServlet#HttpServlet()
     */
    public SaveNewPlayer() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		String first_name = request.getParameter("theFirstName");
		String last_name = request.getParameter("theLastName");
		String password = request.getParameter("thePassword");
		String email = request.getParameter("theEmail");
		String age = request.getParameter("theAge");
		String sex = request.getParameter("theSex");
		String education = request.getParameter("theEducation");
		String country = request.getParameter("theCountry");
		String city = request.getParameter("theCity");
		String picture = request.getParameter("thePicture"); //TODO add functionality choose picture from database
		String checkbox = request.getParameter("theCheckbox");
	

		if (first_name != null && last_name != null && password != null && email != null && age != null && sex != null && education != null && country != null && city != null && picture != null && checkbox != null)
		{
			boolean exists = DataBaseManager.getInstance().findElementById(email);
			if(exists) {
				request.setAttribute("message", "Error: User with this email is already exists");
				request.getRequestDispatcher("/index.jsp").forward(request, response);
				return;
			}
			
			try {
				first_name = first_name.substring(0, 1).toUpperCase() + first_name.substring(1);
				last_name = last_name.substring(0, 1).toUpperCase() + last_name.substring(1);
				Player player = new Player(first_name, last_name, email, password, age, sex, country, city, education, picture);
				
				DataBaseManager.getInstance().insertNewPlayer(player);
				
			} catch (NoSuchAlgorithmException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
//			HttpSession session = request.getSession(true);
//			session.setAttribute("theFullName", first_name+" "+last_name);	
//			session.setAttribute("theEmailName", email);	
		}		 
		request.setAttribute("succ_message", "You have succesfully signed up!");
		request.getRequestDispatcher("/index.jsp").forward(request, response);
	}
}
