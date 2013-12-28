package datastoreEntities;

import java.io.IOException;



import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dbManager.DataBaseManager;

/**
 * Servlet implementation class SaveGameScores
 */
public class SignInServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SignInServlet() {
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

		Object email = request.getParameter("userEmail");
		Object password = request.getParameter("userPassword");

		Player player = DataBaseManager.getInstance().findPlayer(email, password);

		if(player == null) {
			request.setAttribute("message", "Error: Inncorrect Email or password, try again");
			request.getRequestDispatcher("/index.jsp").forward(request, response);
			return;
		}

		HttpSession session = request.getSession(true);
		session.setAttribute("theFullName", player.getFirstName()+" "+player.getLastName());
		session.setAttribute("theEmailName", email.toString());
		request.getRequestDispatcher("/WEB-INF/index.jsp").forward(request, response);
	}

}
