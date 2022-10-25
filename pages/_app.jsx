import { Provider } from "react-redux";
import "../styles/styles.scss";
import Layout from "../components/layout/Layout";
import store from "../redux/store";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

export default MyApp;
