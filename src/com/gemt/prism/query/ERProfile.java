package com.gemt.prism.query;

import com.gemt.prism.factory.Data;


public class ERProfile {
	public static void main(String[] args) throws Exception {
		String table = "JobAsmbl";	    
		String query = "select COL,COLTYPE,WIDTH,DFLT_VALUE from sysprogress.SYSCOLUMNS where TBL ='"+table+"' order by ID";
		
		System.out.println("TABLE   : " + table);
		System.out.println(" ");
		Data d = new Data();
		d.getData(query);		
	}
}
