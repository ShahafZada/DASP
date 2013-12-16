package datastoreEntities;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		Object first_name = request.getParameter("theFirstName");
		Object last_name = request.getParameter("theLastName");
		Object password = request.getParameter("thePassword");//TODO use hash
		Object email = request.getParameter("theEmail");
		Object age = request.getParameter("theAge");
		Object sex = request.getParameter("theSex");
		Object education = request.getParameter("theEducation");
		Object country = request.getParameter("theCountry");
		Object city = request.getParameter("theCity");
		Object picture = request.getParameter("thePicture");
		Object checkbox = request.getParameter("theCheckbox");
	
		if (first_name != null && last_name != null && password != null && email != null && age != null && sex != null && education != null && country != null && city != null && picture != null && checkbox != null)
		{
			boolean exists = DataBaseManager.getInstance().findElementById(email);
			if(exists) {
				request.setAttribute("message", "User with this email is already exists in the Database");
				request.getRequestDispatcher("/WEB-INF/sign_up.jsp").forward(request, response);
				return;
			}
			Player player = new Player(first_name.toString(), last_name.toString(), email.toString(), password.toString(), age.toString(), sex.toString(), country.toString(), city.toString(), education.toString(), picture.toString() );
			
			HttpSession session = request.getSession();
			session.setAttribute("Player", player.getFirstName()+" "+player.getLastName());
	
			DataBaseManager.getInstance().insertNewPlayer(player);
		}
		request.setAttribute("message", "Welcome "+first_name+ " "+last_name);
		request.getRequestDispatcher("/WEB-INF/sign_up.jsp").forward(request, response);
	}
}
