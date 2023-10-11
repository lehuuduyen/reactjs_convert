import {Link} from "react-router-dom";

function LinkButton(props){
	return <Link to={props.to || "/"} className="btn__upload"><span>{props.children}</span></Link>
}
export default LinkButton;