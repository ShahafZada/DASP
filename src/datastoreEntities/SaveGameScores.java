package datastoreEntities;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import datastoreEntities.GameScore;
import dbManager.DataBaseManager;

/**
 * Servlet implementation class SaveGameScores
 */
public class SaveGameScores extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SaveGameScores() {
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
	
		Object name = request.getParameter("theNameField");
		Object score = request.getParameter("theScoreField");
		//Object pic = request.getParameter("thePicField");
		Object pic = request.getParameter("theNameField");
		
		System.out.println("the pic is " + pic.toString());
		System.out.println("the name is " + name.toString());
		System.out.println("the score is " + score.toString());
	
		
		if (pic != null && name != null && score != null)
		{
			GameScore game_score = new GameScore();
			game_score.name = name.toString();
			game_score.pic = pic.toString();
			game_score.score = Integer.parseInt(score.toString());
			
			if(game_score.name.equals("")) return; //delete later
			
			HttpSession session = request.getSession();
			session.setAttribute("userName", game_score.name);
			System.out.println("edited the user name in the session with " + game_score.name);
			DataBaseManager.getInstance().insertNewScore(game_score);
		}
		response.sendRedirect("high_scores");
	}

}
