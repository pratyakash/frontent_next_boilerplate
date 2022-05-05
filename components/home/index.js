import { connect } from 'react-redux';

const HomePage = props => {
	return <div className="homepage__wrapper"></div>;
};

const mapStateToProps = state => {
	const userData = state.userReducer;

	return { userData };
};

// const mapDispatchToProps = {
//   setInfo,
// };

export default connect(mapStateToProps, undefined)(HomePage);
