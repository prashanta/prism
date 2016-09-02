package com.gemt.prism.query;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import com.gemt.prism.factory.Data;

/**
 * Servlet implementation class GetData
 */
@WebServlet(name="getData", urlPatterns={"/getData"})
public class GetData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetData() {
        super();
        
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {		
		String query = request.getParameter("q");		
		JSONObject val = new JSONObject();		
		if(query != null){
			Data d = new Data();
			try {
				val = d.getData(query);				
			} catch (Exception e) {				
				e.printStackTrace();
				try {
					val.put("v", 0);
					val.put("message", e.getMessage());
				} catch (JSONException e1) {					
					e1.printStackTrace();
				}								
			}
		}
		else{			
			try {
				val.put("message", "No query to run");
				val.put("v", 0);
			} catch (JSONException e) {				
				e.printStackTrace();
			}			
		}
		java.io.PrintWriter out = response.getWriter();
		System.out.println(" -- END --");
		out.println(val.toString());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

}
