import React, { useState } from "react";
import axios from "axios";
import "./ChatBot.css";


const ChatBot = () => {


const [messages,setMessages] = useState([

{
text:"Hello! I'm your Job Portal Assistant. Ask me anything.",
sender:"bot"
}

]);


const [input,setInput] = useState("");





const sendMessage = async()=>{


if(!input.trim()) return;




const userMessage = {

text:input,

sender:"user"

};





setMessages(prev=>[

...prev,

userMessage

]);






try{


const {data}= await axios.post(

"http://localhost:5000/api/v1/chatbot/message",

{

message:input

}

);






const botMessage={


text:data.reply,

sender:"bot"


};






setMessages(prev=>[

...prev,

botMessage

]);





}

catch(error){


console.log(error);



setMessages(prev=>[

...prev,

{

text:"Sorry, server error",

sender:"bot"

}

]);



}






setInput("");



};









return (


<div className="chatbot-container">


<h2>
Job Portal Help Assistant
</h2>





<div className="chat-box">



{

messages.map((msg,index)=>(


<div

key={index}

className={`message ${
msg.sender==="user"
?
"user"
:
"bot"
}`}

>

{msg.text}


</div>



))


}


</div>








<div className="input-area">


<input

type="text"

placeholder="Ask a question..."

value={input}

onChange={(e)=>

setInput(e.target.value)

}


/>



<button

onClick={sendMessage}

>

Send

</button>




</div>






</div>


);


};



export default ChatBot;