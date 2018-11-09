import React from 'react';
import { Box, Email, Item, Span, A, renderEmail } from 'react-html-email';


// 2. Create some CSS to be injected in the head as a prop of
// the <Email> component. See step #3 below.
const css = `
@media only screen and (max-device-width: 480px) {
  font-size: 20px !important;
  text-align: center !important;
}`.trim();

const style = {

  title: {
 

  },

  BackgroundTop: {
	backgroundColor:'red',
    height: '30px',
    marginBottom: '-15px',
    paddingLeft: '10px',
    paddingTop: '4px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    marginLeft:'50px',
    width: '1000px',
},

  BackgroundBottom: {
	backgroundColor:'red',
    height: '30px',
    marginBottom: '-15px',
    paddingLeft: '10px',
    paddingTop: '4px',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
    marginLeft:'50px',
    width: '1000px',
    textAlign:'center'
},



 name: {
	textAlign:'center',
	fontSize: '18px',
	color: 'white',
	fontWeight:'bold',
	lineHeight:'2',
},

 margeTop: {
	textAlign:'center',
	fontSize: '18px',
	color: 'white',
	fontWeight:'bold',
	lineHeight:'1',
},

 margeBottom: {
	textAlign:'center',
	fontSize: '18px',
	color: 'white',
	fontWeight:'bold',
	lineHeight:'1',
},

 nameBottom: {
	marginLeft: '50px',
	fontSize: '18px',
	color: 'black',
	fontWeight:'bold',
	lineHeight:'2',
},

text:{
	marginTop: '0px',
	fontSize: '20px',
	marginLeft: '10px',
	
},

LinkBottom:{
	marginLeft: '50px',
	fontSize: '18px',
	color: 'white',
	fontWeight:'bold',
	textAlign:'center'
},

link:{
	fontSize: '18px',
	color: 'white',
	fontWeight:'bold',
	lineHeight:'2',
	textAlign:'center',
	textDecoration:'none',
},

};

//3. Create your react component using react-html-email components
const EmailSignalerTemplate = function(props) {
  return <Email title="Hello World!" headCSS={css}>
            <Box>
              	<Item style={style.BackgroundTop}>
		  			<h1>
				  		Ton message a été signalé !
			  		</h1>
				</Item>
				<Item >
		  			<Span style={style.margeTop}>
				  		
			  		</Span>
				</Item>
  			</Box>

  			<Box>
				<Item>	  					  			
				  	<Item style={style.text}>
				  	<h3>
				  		Avertissement : ton message a été signalé par un utilisateur.<br />
				  		A partir de 3 avertissements ton compte sera bloqué.<br />
				  		Merci de respecter les règles d'utilisation de KURBYS. <br /><br />
				  		<strong>Le message signalé :</strong><br />
				  		{props.message}
				  	</h3>
				  	</Item>
			  	</Item>
			  	
            </Box>

             <Box>
         
              	<Item style={style.BackgroundBottom}>
		  			<Span style={style.LinkBottom}>
				  		<A style={style.link} href="https://www.kurbys.com/">Retourner sur KURBYS</A>
			  		</Span>
				</Item>

  			</Box>

        </Email>;
};

// 4. Feed your component into react-html-email's renderEmail 
// function, which converts it into the needed html, tables and all.
export const EmailSignaler = function(message){
  return renderEmail(<EmailSignalerTemplate message={message}/>);
}