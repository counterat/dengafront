import c from './Loader.module.scss';

interface LoaderProps {}

function Loader({}: LoaderProps) {
	return (
		<div className={c.loader}>
			<img src="/assets/loader.png" alt="loader" />
		</div>
	);
}

export default Loader;
