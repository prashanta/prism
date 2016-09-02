package com.gemt.prism.factory;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Date;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.gemt.prism.utility.ConnectionHelper;

public class Data {

	Connection conn;
	Statement st; 

	public JSONObject getData(String query) throws SQLException, JSONException{
		long startTime = System.nanoTime();
		Connection conn = null;
		JSONObject jo = new JSONObject();	    
		try {
			System.out.println("RUNNING QUERY: \n" + query + "\n-------------------------- \n");			
			conn = ConnectionHelper.getConnection();
			st = conn.createStatement();
			   
			JSONArray rows = new JSONArray();
			JSONArray header = new JSONArray();
			ResultSet rs = st.executeQuery(query);

			ResultSetMetaData rsMetaData = rs.getMetaData();
			int numberOfColumns = rsMetaData.getColumnCount();					
					
			for(int i = 1 ; i <= numberOfColumns; i++){
				header.put(rsMetaData.getColumnName(i));						
			}
			int c = 0;
			while (rs.next()){
				JSONArray row = new JSONArray();
				c++;
				for(int i = 1 ; i <= numberOfColumns; i++){	
					if(rsMetaData.getColumnType(i) == java.sql.Types.VARCHAR){
						String temp = rs.getString(i);
						row.put(temp);					 
					}
					else if(rsMetaData.getColumnType(i) == java.sql.Types.INTEGER){
						int temp = rs.getInt(i);	 
						row.put(temp); 
					}					    		
					else if(rsMetaData.getColumnType(i) == java.sql.Types.DECIMAL){
						float temp = rs.getFloat(i);	 
						row.put(temp); 
					}					    		
					else if(rsMetaData.getColumnType(i) == java.sql.Types.BIT){
						boolean temp = rs.getBoolean(i);	 					
						row.put(temp?"1":"0"); 
					}					    		
					else if(rsMetaData.getColumnType(i) == java.sql.Types.DATE){
						Date temp = rs.getDate(i);	 		
						if(temp == null)
							row.put("");
						else
							row.put(temp.toString()); 
					}					    		
				}
				//System.out.println(row.toString());//Move to the next line to print the next row.
				rows.put(row);						
			}
			if(c > 0){
				jo.put("v", 1);
				jo.put("header", header);
				jo.put("data", rows);
			}
			else{			
				jo.put("v", 0);
				jo.put("message", "Data not found!");		
			}
			
			st.close();			
			System.out.println("END");
			long endTime = System.nanoTime();
			float time = (endTime - startTime)/1000000000; 
			System.out.println("[Run Time: "+time + " sec]");
			jo.put("time", time);
		} catch (Exception e) {
			e.printStackTrace();
			jo.put("v", 0);
			jo.put("message", e.getMessage());
		}		
		finally{
			ConnectionHelper.close(conn);
		}
		return jo;
	}	
}
