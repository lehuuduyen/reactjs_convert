import './Home.css';
import {Col, Row} from "antd";
import ConvertFile from "../../components/ConvertFile";
import ConvertGuide from "../../components/ConvertGuide";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function Home() {
	const [params, setParams] = useState(['PNG', 'ICO'])
	const {id} = useParams();

	useEffect(() => {
		if(id){
			const splitId = id.split('-');
			setParams([splitId[1].toUpperCase(), splitId[3].toUpperCase()])
		}
	}, [id]);

	return <div className="home">
		<div className="home__convert">
			<Row>
				<Col span={24}>
					<ConvertFile/>
				</Col>
			</Row>
			
		</div>
	</div>
}

export default Home;