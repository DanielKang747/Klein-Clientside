//the answerable API



//this is the controller of the answer.
class answer{
	/*
		dataString contains identifying information about this question, like which assignment, any random
		stuff etc.
	*/
	constructor(dataString){
		this.AnsString = "";
		this.dataString=dataString;
		this.isCorrect = false;
		this.yesStr = "";
		//to register the onclick, we need a reference to this, which we can't have unless we 
		//create it, since the button's "this" is not the same as the answerBox's "this", hence, "that".
		var that = this;
		/*
			This part is a bit weird.  The function that gets called every time the input changes refers to an 'ev', 
			which is the vnode that called it (in this case, the input box).  ev.target.value means, in this case, 
			for us to get the value from the calling vnode (which is the text in the box) and call the given function.
			
			A bit weird, but just go with it.
		*/
		this.inBox = {}; //derived classes change this
		this.cls = "";
		//this.ansBox = new answerBox(this);
	}
	
	setAnsString(Ans)
	{
		
		this.AnsString = Ans;
	}
	
	//currently just boilerplate checkAnswer function.  Eventually will involve server calls.  It is the client-side controller
	checkAnswer()
	{
		if(this.AnsString != "")
		{
			//obtain the data string components
			var comps = this.dataString.split(":");
			//this will be updated later and totally replaced if we go server-side
			if(comps[0] == "numeric")
			{
				var idealAns = Number(comps[1]);
				var tolerance = 0;
				if(comps[2] !== "absolute")
					tolerance = Number(comps[2]);
				var studentAns = Number(this.AnsString);
				if(Math.abs(studentAns-idealAns) <= tolerance)
				{
					this.isCorrect = true;
					return true;
				}
				else
				{
					this.isCorrect = false;
					return false;
				}
			}
			else{
				if(this.AnsString === this.dataString)
				{
					this.isCorrect=true;
					return true;
				}
				else
				{
					this.isCorrect=false;
					return false;
				}
			}
		}
		else
			return false;
	}
	
}

class answerBox extends answer{
	constructor(dataString,newID=""){
		super(dataString,"text");
		this.ID = newID;
	}
	
	addContent (page) {
	var that = this;

	//add the answer box
	var ansBx = document.createElement("INPUT");
	ansBx.setAttribute("type","text");
	ansBx.setAttribute("id",that.ID+"_answerBox");
	ansBx.setAttribute("class","answerBox");
	ansBx.oninput=function(){that.setAnsString(ansBx.value)};

	page.appendChild(ansBx);
	//add the check answer feedback character
	page.appendChild(makeNewHTML({tag:"b",options:{id:"AnswerCheck"+that.ID},content:""}));

}
}

class multipleChoice extends answer{
	constructor(dataString,newID=""){
		super(dataString,"text");
		this.ID = newID;
	}

	addContent(page){

	var that = this;
	var ansBx = document.createElement("INPUT");
	ansBx.setAttribute("type", "radio");
	ansBx.setAttribute("id",that.ID+"_multipleChoice");
	ansBx.setAttribute("class","multipleChoice");



	}

}